export default class UserService {
  async fetchUsers(page = 1) {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/users?p=" + page,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    return response;
  }

  async fetchUsersByQuery(query: string) {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "api/users?q=" + query,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    return response;
  }
}
