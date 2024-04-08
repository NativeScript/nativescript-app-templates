export const Component = (props) => {
    const { count } = props;
    return (
      <label
        text={`${count()} tap${count() === 1 ? '' : 's'}`}
        on:tap={() => {
          alert(`You have tapped ${count()} time${count() === 1 ? '' : 's'}`);
        }}
        class="text-center text-2xl my-6 text-green-500"
      />
    );
  };
  