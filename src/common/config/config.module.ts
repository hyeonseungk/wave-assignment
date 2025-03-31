import { Module } from '@nestjs/common';
import { ConfigManager } from './config-manager';

@Module({
  providers: [
    {
      provide: ConfigManager,
      useFactory: async () => {
        const configManager = new ConfigManager();
        await configManager.initialize();
        return configManager;
      },
    },
  ],
  exports: [ConfigManager],
})
export class ConfigModule {}
