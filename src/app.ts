import * as express from 'express';
import * as cors from 'cors';
import loginRoutes from './routes/loginRoute';
import errorMiddleware from './middlewares/errorMiddleware';
import teamsRoutes from './routes/teamsRoute';
import matchesRoutes from './routes/matchesRoute';
import leaderboardRoutes from './routes/leaderboardRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/login', loginRoutes);
    this.app.use('/teams', teamsRoutes);
    this.app.use('/matches', matchesRoutes);
    this.app.use('/leaderboard', leaderboardRoutes);
    this.app.use(errorMiddleware);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
