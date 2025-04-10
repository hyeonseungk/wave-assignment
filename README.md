# 프로젝트 개요
- NestJS 프레임워크를 사용했습니다. 프레임워크 사용 시 장단점이 있지만 Dependency Injection 관리의 문제를 맡길 수 있다는 장점, 웹 애플리케이션이 가져야하는 필수 AOP 기능들(인증/인가, 입력값 유효성 검증 등)을 간편하게 구현할 수 있다는 큰 장점이 있습니다.
- Domain Driven Design 적용 및 Hexagonal Architecture를 지향합니다.
  - 비지니스에 직접적으로 관련된 모든 로직은 domain 디렉토리로 제한합니다.
  - 전반적인 업무 흐름를 담당하고 어댑터를 사용하는 영역이 application 디렉토리입니다. 비지니스에 직접적으로 관련된 로직보다는 최대한 기본적인 로직 처리만 수행합니다.
    - 복잡한 비지니스 로직 판단이 필요할 정도로 비지니스가 발전하는 경우, 추후에 domain 디렉토리 내에 domain service들을 추가하고 application service가 domain service들에 관련 판단을 위임하도록 합니다.
    - 되도록 대부분의 비지니스 정책들은 policy 디렉토리 안에 정의하고 policy에 두기 애매한 정책들은 관련 Domain Entity나 Domain Service에 정의함으로써 코드 응집도를 높입니다.
  - 인터페이스(port)는 애플리케이션 서비스 영역에 두고, 구현체(adapter)는 확실히 분리합니다. 혼자 개발할 때는 큰 의미가 없을 수도 있지만, 담당자가 한 명 이상이 되는 경우 인터페이스를 기준으로 효율적인 병렬 작업 진행이 가능해집니다.
  - 프로그램에 대한 인커밍(in), 아웃고잉(out) 관련 코드의 분리를 명시적으로 드러냅니다. HTTP API 콜을 가장 앞단에서 받는 컨트롤러도 결국 인커밍 어댑터 중 하나에 불과합니다.
  - 컨트롤러의 경우 서비스가 발전할스로 실제 유저의 유즈케이스별로 하나씩 만드는 것이 권장됩니다(=컨트롤러당 메소드 하나)
  - 아웃고잉 어댑터의 경우, 다양한 구현체들이 있겠지만 Domain Entity를 담고있는 OOORepository를 제외하고는 네이밍을 자유롭게 정합니다.
- 하나의 리퀘스트가 발생했을 때 그 Context를 관리하기 위해 AynscLocalStorage를 사용합니다.
  - RequestId, Transaction 등 한 리퀘스트의 생애주기 전반에 걸쳐 공유해야할 컨텍스트를 저장합니다.
- DB 트랜잭션이 필요한 API의 경우, TransactionInterceptor를 컨트롤러의 해당 메소드에 적용합니다.
  - 하나의 컨트롤러의 메소드에서 수행하는 command성 작업이 하나의 어그리거트가 아닌 다양한 종류의 어그리거트를 저장하거나 해서 성능상 문제가 있는 경우가 되기 전까지는 API별 트랜잭션으로 대응합니다.
  - 그런 성능상 문제가 발생하면 컨트롤러의 메소드가 아닌 "애플리케이션 서비스"의 각 메소드 단위로 트랜잭션을 적용하거나(Interceptor가 아닌 별도의 데코레이터 정의로 대응)
  - 시스템 분리 및 도메인 이벤트 도입 및 MSA를 고려합니다.
- 에러의 경우 CustomError를 정의하고 이를 상속받는 BadRequestError, ServerError만을 정의합니다. 더 세부적인 각각의 에러 내용은 ErrorMsg로 판단할 수 있도록 합니다.
  - 에러 관련해서 레이어별 에러를 도입하게 되면 코드 복잡도가 너무나도 급상승하는 경향이 있기에 보통의 경우, Error는 common 영역에 정의하고 여러 레이어에서 공통으로 사용합니다.
  - 에러 종류가 너무 많아지면 ErrorMsg 자체를 다시 분류하여 여러 메시지 유형으로 재정의합니다.
- 도메인 영역은 Aggregate 개념을 바탕으로 정의합니다.
  - 보통 Aggregate Root는 Domain Entity가 되고, Root가 또다른 Domain Entity나 Value Object들을 포함하는 구조로 정의합니다.
  - 하나의 필드를 primitive type이 아닌 Value Object로 만들기 위해 클래스를 정의하면 값의 유효성 검증 및 로직 응집도 측면에서 좋고 코드의 표현력이 풍부해집니다.
  - 다만, 모든 필드를 Value Object로 만들려고 하면 코드량이 기하급수적으로 증가하게 되고, 어떤 측면에서는 코드의 가독성이 떨어질 수도 있습니다. 어느 선까지 타협할 것인지 논의가 필요합니다. 다만 빠른 성장이 중요하기보다는 이미 성공한 서비스라서 안정화가 더 중요하다면 Value Object를 될 수 있으면 많이 적용하는 것이 좋다고 개인적으로 생각합니다.
- Domain Entity와 Persistence Entity(보통 ORM에서의 Entity)를 명확하게 분리했습니다.
  - 본 프로젝트처럼 prisma를 쓰는 경우 Persistence Entity가 node_modules에 정의되기에 분리하는 것이 더 자연스럽지만 TypeORM 등의 기타 ORM을 사용하는 경우 굳이 분리하지 않아도 되는 경우가 많습니다.
  - Domain Entity와 Persistence Entity를 분리할 정도로 장점이 있는 경우에만 분리합니다. 그렇지 않으면 양자 간의 변환 함수(매퍼)를 작성하는 것이 고통스러울 수 있습니다. 심지어 각 필드가 모두 Value Object인 경우 더욱더 그렇습니다.
- 테스트
  - 비지니스 로직이 간단할수록 통합 테스트를 먼저 작성합니다.
  - 복잡한 비지니스 로직을 담고 있는, 도메인 엔티티의 메소드나 도메인 서비스가 있는 경우에 단위 테스트를 적극적으로 적용합니다.


# 피드백
- 이 서버가 특정 ai 서버로 sts 작업 요청을 보낼 때, originalPath가 FilePath인 건지, Url에서의 path인 건지가 불분명합니다. 
  - FilePath라면 해당 AI 서버와 이 서버가 볼륨을 공유한다는 이야기가 되어서 어색하고, Url에서의 path라면 해당 링크에서 originalFile을 AI 서버가 가져와서 처리한다는 뜻일텐데 이 부분이 주석 등에 추가 설명되면 좋겠습니다.
- 파일의 미리보기 링크를 만든다든지, CI/CD 파이프라인을 구성하려면 보통 외부의 서비스를 사용해야하는데 이에 대한 가이드나 사용가능한 무료계정 등을 함께 알려주시는 것도 좋을 것 같습니다.


