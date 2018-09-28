export const addGeneralLoginUser = payload => ({
  type: 'SAVE_GENERAL_LOGIN_INFO',
  payload
});

export const addAdminLoginUser = payload => ({
  type: 'SAVE_ADMIN_LOGIN_INFO',
  payload
})

export const addGeneralLoginUser1 = payload => {

  console.log('payload', payload);
  return (dispatch, getState) => {
    console.log('[in action addGeneralLoginUser]: ');
    fetch('/api/onleave/v1/addUser', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        return dispatch({
          type: 'SAVE_GENERAL_LOGIN_INFO',
          payload
        });
      })
      .catch(e => console.log(e));
  };
}

/*eslint-disable no-unused-vars*/
const fetchUserData = () => {
  return fetch('/api/onleave/userlogin', {
    method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(this.state)
  })
    .then(response => response.json())
    .then(data => {
      console.log('data:', data)
    })
    .catch(e => {
      throw new Error(e);
    })
}

const fetchAdminData = () => {
  fetch('/api/on_leave/admin_login', {
    method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(this.state)
  })
    .then(res => res.json())
    .then(data => {
      let token = data.token || '';
      this.setState({token});
      sessionStorage.setItem('token', token)
    })
    .catch(e => {
      throw new Error(e);
    })
}
/*eslint-enable no-unused-vars*/

export const addAdminLoginUser1 = (payload) => (dispatch) => {
  fetch('/api/onleave/v1/addAdmin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'SAVE_ADMIN_LOGIN_INFO',
        payload
      })
    })
}

export const addRequestFormInfo = payload => ({
  type: 'SAVE_REQUEST_FORM_INFO',
  payload

})