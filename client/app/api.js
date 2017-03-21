export function getTree(path) {
  return fetch(`http://localhost:8080/api/tree/${path}`).then(res => res.json());
}
