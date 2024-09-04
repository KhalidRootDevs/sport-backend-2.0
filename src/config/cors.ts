import cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'https://your-production-domain.com'];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true, // Allow cookies with CORS
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

export default cors(corsOptions);
