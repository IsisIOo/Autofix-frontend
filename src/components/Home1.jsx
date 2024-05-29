import { useParams } from 'react-router-dom';

const Home1 = () => {
  const { id } = useParams();

  // Ahora puedes usar el valor de `id` en tu componente.
  // ...

  return (
    <p>El id es: {id}</p>
  );
};

export default Home1;