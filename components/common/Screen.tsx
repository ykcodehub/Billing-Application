import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export default function Screen({ children }: Props) {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "bottom"]}
    >
      {children}
    </SafeAreaView>
  );
}