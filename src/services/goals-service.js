import http from './base-http-service';

const createGoal = goal =>
  http.post('/users/creategoal', goal).then(response => response.data);

const getGoals = () => http.get('/users/goals').then(response => response.data);

const getLastGoals = days =>
  http.post(`/users/goals/${days}`).then(response => response.data);

export default {
  createGoal,
  getGoals,
  getLastGoals
};
