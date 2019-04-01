import http from './base-http-service';

const createGoal = goal =>
  http.post('users/creategoal', goal).then(response => response.data);

const getGoals = () => http.get('users/goals').then(response => response.data);

export default {
  createGoal,
  getGoals
};
