import app from "./app";
import initdb from "./config/mongodb";

initdb();

app.listen(3000, () => {
  console.log("Server on port", 3000);
});


