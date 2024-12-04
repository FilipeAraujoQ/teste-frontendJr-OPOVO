/* eslint-disable react/prop-types */
const Button = (props) => {
  return (
    <button
      className={`${props.className} btn bg-102c57 text-f8f0e5`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button