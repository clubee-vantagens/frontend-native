import CustomText from "./CustomText";

export default function ErrorMessageComponent({ children }) {
  return (
    <CustomText
      style={{
        color: "red",
        fontSize: 10,
        marginLeft: 10 /*maxWidth: "60%" */,
      }}
      variant="semiBold"
    >
      {children}
    </CustomText>
  );
}
