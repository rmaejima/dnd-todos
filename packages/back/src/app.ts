import { FastifyPluginAsync } from 'fastify';
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload-deprecated';
import fastifyCors from 'fastify-cors-deprecated';
import { join } from 'path';

export type AppOptions = Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    routeParams: true,
    options: opts,
  });

  void fastify.register(fastifyCors, {
    origin: '*',
  });
};

export default app;
export { app };
