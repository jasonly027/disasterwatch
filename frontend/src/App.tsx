import "./App.css";

function App() {

  const testData = 
  {
    description: 'a meteor hit mcgregor',
    image: 'https://i.pinimg.com/736x/01/59/a1/0159a16bd0249c509a6820f405db2003.jpg',
    resolved: false,
    upvote: 0,
    longitude: 3462834638,
    latitude: 324783267834,
    danger_level: 'avoid'
  }

  async function insertData() {
    const url = "http://localhost:8080/api/v1/add_pin"
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }

    async function getData() {
      const url = "http://localhost:8080/api/v1/get_pin"
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    }

  return (
    <>
      <h1>Hello World</h1>
      <button onClick={insertData}>Add data test</button>
      <button onClick={getData}>Fetch data test</button>
    </>
  );
}

export default App;
