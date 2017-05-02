export function getTree(path) {
  return fetch(`http://localhost:8080/api/tree/?path=.${path}`)
      .then(res => (!res.ok || res.status == 204) 
        ? Promise.reject(res) 
        : res.json()
      );
}

export function getFile(path) {
  return fetch(`http://localhost:8080/api/file/?path=.${path}`)
      .then(res => (!res.ok || res.status == 204) 
        ? Promise.reject(res) 
        : res.json()
      );
}
