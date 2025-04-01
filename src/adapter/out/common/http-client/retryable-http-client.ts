import { Injectable, Logger } from '@nestjs/common';
import got, {
  Got,
  OptionsOfJSONResponseBody,
  RequestError,
  RequiredRetryOptions,
  Response,
} from 'got';

interface RetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: RequestError) => boolean;
}

@Injectable()
export class RetryableHttpClient {
  private readonly logger = new Logger(RetryableHttpClient.name);
  private readonly client: Got;

  private readonly DEFAULT_CONFIG: Required<RetryConfig> = {
    maxRetries: 3,
    initialDelayMs: 1000,
    maxDelayMs: 10000,
    shouldRetry: (error: RequestError) => {
      // 4xx는 재시도하지 않음
      if (error.response?.statusCode) {
        return !(
          error.response.statusCode >= 400 && error.response.statusCode < 500
        );
      }
      // 네트워크 에러는 재시도
      return true;
    },
  };

  constructor() {
    this.client = got.extend({
      timeout: { request: 10000 },
      retry: {
        limit: this.DEFAULT_CONFIG.maxRetries,
        calculateDelay: ({ attemptCount, error, computedValue }) => {
          if (!this.DEFAULT_CONFIG.shouldRetry(error)) {
            return 0;
          }

          // 지수 백오프 적용
          const delay = Math.min(
            this.DEFAULT_CONFIG.initialDelayMs * Math.pow(2, attemptCount - 1),
            this.DEFAULT_CONFIG.maxDelayMs,
          );

          this.logger.debug(
            `Retry attempt ${attemptCount}/${this.DEFAULT_CONFIG.maxRetries}. ` +
              `Waiting ${delay}ms. Error: ${error.message}`,
          );

          return delay;
        },
      },
      hooks: {
        beforeRetry: [
          (error, retryCount) => {
            this.logger.warn(
              `Request failed (attempt ${retryCount}): ${error.message}`,
            );
          },
        ],
        afterResponse: [
          (response) => {
            this.logger.debug(
              `Request completed: ${response.statusCode} ${response.statusMessage}`,
            );
            return response;
          },
        ],
      },
    });
  }

  private createOptions(
    options?: OptionsOfJSONResponseBody,
    retryConfig?: RetryConfig,
  ): OptionsOfJSONResponseBody {
    const finalRetryConfig = { ...this.DEFAULT_CONFIG, ...retryConfig };

    return {
      ...options,
      retry: {
        ...(options?.retry as Partial<RequiredRetryOptions>),
        limit: finalRetryConfig.maxRetries,
        calculateDelay: ({ attemptCount, error }) => {
          if (!finalRetryConfig.shouldRetry(error)) {
            return 0;
          }

          return Math.min(
            finalRetryConfig.initialDelayMs * Math.pow(2, attemptCount - 1),
            finalRetryConfig.maxDelayMs,
          );
        },
      },
    };
  }

  async get<T>(
    url: string,
    options?: OptionsOfJSONResponseBody,
    retryConfig?: RetryConfig,
  ): Promise<Response<T>> {
    try {
      return await this.client.get<T>(
        url,
        this.createOptions(options, retryConfig),
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async post<T>(
    url: string,
    options?: OptionsOfJSONResponseBody,
    retryConfig?: RetryConfig,
  ): Promise<Response<T>> {
    try {
      return await this.client.post<T>(
        url,
        this.createOptions(options, retryConfig),
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async put<T>(
    url: string,
    options?: OptionsOfJSONResponseBody,
    retryConfig?: RetryConfig,
  ): Promise<Response<T>> {
    try {
      return await this.client.put<T>(
        url,
        this.createOptions(options, retryConfig),
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async delete<T>(
    url: string,
    options?: OptionsOfJSONResponseBody,
    retryConfig?: RetryConfig,
  ): Promise<Response<T>> {
    try {
      return await this.client.delete<T>(
        url,
        this.createOptions(options, retryConfig),
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: RequestError): void {
    if (error.response) {
      this.logger.error(
        `HTTP request failed with status ${error.response.statusCode}: ${error.message}`,
        {
          url: error.options.url,
          method: error.options.method,
          statusCode: error.response.statusCode,
          body: error.response.body,
        },
      );
    } else {
      this.logger.error(`HTTP request failed: ${error.message}`, {
        url: error.options?.url,
        method: error.options?.method,
        code: error.code,
      });
    }
  }
}
