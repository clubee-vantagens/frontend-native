import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomText from "../components/CustomText";
import { CaretLeft } from "phosphor-react-native";

export default function TermsAndConditionsScreen({ handleHideNotice }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleHideNotice}>
          <CaretLeft size={22} color="black" weight="bold" />
        </Pressable>
      </View>
      <CustomText style={styles.title} fontSize={30} variant="bold">
        Aviso de Privacidade
      </CustomText>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <CustomText variant="bold" style={styles.text}>
          Esta Política de Privacidade descreve como o Clubee - Clube de
          Vantagens, coleta, usa, armazena, compartilha e protege as informações
          pessoais dos usuários, em conformidade com a Lei Geral de Proteção de
          Dados (LGPD) - Lei nº 13.709/2018 e demais legislações aplicáveis. O
          compromisso do Clubbe é garantir a privacidade e a segurança dos dados
          fornecidos pelos usuários.
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText style={styles.text}>
          {"\n"}
          <CustomText variant="bold">1- Coleta de dados:
          </CustomText>O Clubee coleta apenas os dados necessários para o funcionamento do aplicativo, tais como nome, e-mail, número de telefone, CPF e data de nascimento.
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText style={styles.text}>
          <CustomText variant="bold">2- Uso dos dados: </CustomText>
          Os dados coletados são utilizados exclusivamente para a prestação dos serviços oferecidos pelo Clubee, como o acesso às vantagens disponíveis no aplicativo.
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText style={styles.text}>
          <CustomText variant="bold">3- Compartilhamento de dados: </CustomText>
          Com parceiros comerciais do Clubee, exclusivamente para a oferta de produtos e serviços dentro do aplicativo, desde que respeitadas as disposições da LGPD. Com prestadores de serviços que auxiliem no funcionamento e melhoria do aplicativo, como empresas de hospedagem de dados, desenvolvedores de software e sistemas de pagamento. Quando exigido por autoridades legais para cumprimento de obrigações legais ou ordens judiciais.
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText style={styles.text}>
          <CustomText variant="bold">4- Segurança dos dados: </CustomText>
          O Clubee adota medidas de segurança para proteger os dados dos usuários contra acessos não autorizados, perda, uso indevido ou alteração.
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText style={styles.text}>
          <CustomText variant="bold">
            5- Retenção e Exclusão de Dados:  
          </CustomText>
          Os dados pessoais serão armazenados pelo tempo necessário para cumprir as finalidades descritas nesta Política ou conforme exigido pela legislação aplicável. Caso o usuário solicite a exclusão de seus dados, o Clubee eliminará as informações, salvo quando houver obrigação legal de mantê-los.
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText>
          <CustomText variant="bold">6- Direitos do usuário: </CustomText>Os usuários do Clubee têm o direito de acessar, corrigir, atualizar ou excluir seus dados pessoais a qualquer momento, bem como de solicitar a exclusão de sua conta.
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText style={styles.text}>
        <CustomText variant="bold">
            7- Alterações na Política de Privacidade:
          </CustomText>
          O Clubee reserva-se o direito de fazer alterações nesta política a qualquer momento, sendo de responsabilidade do usuário verificar regularmente as atualizações.
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText style={styles.text} variant="bold">
          8-Ao utilizar o aplicativo Clubee, o usuário concorda com esta política de privacidade. Em caso de dúvidas ou preocupações, entre em contato conosco através do e-mail: clubeefidelidade@gmail.com.
        </CustomText>

        <Text>{"\n"}</Text>
        <CustomText>
          <CustomText variant="bold">Data de Vigência:</CustomText> 10/09/2024
        </CustomText>

        <CustomText>
          <CustomText variant="bold">Última Atualização:</CustomText> 09/09/2024
        </CustomText>
        <Text>{"\n"}</Text>
        <CustomText style={styles.text}>
          Com essa política de privacidade, o Clubee reforça seu compromisso em respeitar a privacidade de seus usuários e proteger seus dados pessoais, garantindo a conformidade com a Lei Geral de Proteção de Dados (LGPD).
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 30,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    textAlign: "justify",
  },
});
