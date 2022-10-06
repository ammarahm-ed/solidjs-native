const Component = (props) => {
  return (
    <button
      on:tap={props.increment}
      text="Running"
    />
  );
};

export default Component;
