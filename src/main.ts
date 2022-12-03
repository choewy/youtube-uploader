import { AppModule } from '@/app';
import { Bootstrap } from './bootstrap';

(async () => {
  await Bootstrap.createApp(AppModule);
  await Bootstrap.run();
})();
