
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const muscleRouter = require('./routes/muscle.group.router');
const exerciseRouter = require('./routes/exercise.router');
const workoutRouter = require('./routes/workout.router');
const exerciseInstanceRouter = require('./routes/exercise.instance.router');
const setRouter = require('./routes/set.router');
const historyRouter = require('./routes/history.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/muscle_group', muscleRouter);
app.use('/api/exercise', exerciseRouter);
app.use('/api/workout', workoutRouter);
app.use('/api/exercise_instance', exerciseInstanceRouter);
app.use('/api/set', setRouter);
app.use('/api/history', historyRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
