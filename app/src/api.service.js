import { BASE_URL } from './config';

export async function joinSession(userObj) {
  const requestJoinMeeting = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  };

  return fetch(`${BASE_URL}/api/joinMeeting`, requestJoinMeeting);
}

export async function createSession(sessionObj) {
  const requestCreateMeeting = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionObj),
  };

  return fetch(`${BASE_URL}/api/createMeeting`, requestCreateMeeting);
}

export async function endStream(sessionObj) {
  const requestEndMeeting = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionObj),
  };

  return fetch(`${BASE_URL}/api/endMeeting`, requestEndMeeting);
}
