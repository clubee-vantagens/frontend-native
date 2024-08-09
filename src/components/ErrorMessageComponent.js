import CustomText from "./CustomText";

export default function ErrorMessageComponent({ children, style }) {
  return (
    <CustomText
      style={[
        {
          color: "red",
          fontSize: 10,
          marginLeft: 10 /*maxWidth: "60%" */,
        },
        style,
      ]}
      variant="semiBold"
    >
      {children}
    </CustomText>
  );
}
