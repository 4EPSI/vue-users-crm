export default function loadMore(res) {
  const messages = []

  console.log(res);
  console.log(res.length);

  if(res.length > 3) { // if > 3 
    for(let i = 0; i < 3; i++) {
      res[i].main = true
      messages.push(res[i])
    }
    return messages
  } else { // if < 2
    for(let i = 0; i < res.length; i++) {
      res[i].main = true
      messages.push(res[i])
    }
    return messages
  }
}