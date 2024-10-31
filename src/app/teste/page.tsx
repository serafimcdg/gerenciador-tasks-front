import withAuth from "../utils/withAuth";



const teste = () => {
  return (
    <div>
      <h1>Testando HOC</h1>
    </div>
  );
};

export default withAuth(teste);  
