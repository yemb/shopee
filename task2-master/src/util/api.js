import request from './request'

// login
export function loginApi (params) {
  return request('/auth/token', params, 'POST')
}

export function getActivitiesApi (params) {
  return request('/events', params)
}

// get channel list
export function getChannelsApi () {
  return request('/channels')
}

// get participants
export function getParticipants (id) {
  return request(`/events/${id}/participants`)
}

// participate
export function participate (id) {
  return request(`/events/${id}/participants`, {}, 'POST')
}

// cancel participate
export function cancelParticipate (id) {
  return request(`/events/${id}/participants`, undefined, 'DELETE')
}

// get likes
export function getLikes (id) {
  return request(`/events/${id}/likes`, {}, 'GET')
}

// like
export function like (id) {
  return request(`/events/${id}/likes`, {}, 'POST')
}

// cancel like
export function cancelLike (id) {
  return request(`/events/${id}/likes`, undefined, 'DELETE')
}

// get comment
export function getComments (id) {
  return request(`/events/${id}/comments`)
}

// comment
export function submitComment (id, comment) {
  return request(`/events/${id}/comments`, { comment }, 'POST')
}

// get profile
export function getProfileApi () {
  return request(`/user`)
}

export function getMyActivities (params) {
  return request('/user/events', params)
}
