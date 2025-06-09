import { CaretLeft } from "phosphor-react-native";
import { Pressable, StyleSheet, ScrollView, View } from "react-native";
import { router } from "expo-router";
import FAQAccordion from "../../components/FaqAccordion";
import Constants from 'expo-constants'

export default function Faq() {
  const faqData = [
    {
      question: "O que é o programa de pontos do Clubee?",
      answer:
        "É um programa em que você acumula pontos ao realizar compras de produtos ou serviços em estabelecimentos conveniados ao Clubee. Quanto mais você compra, mais pontos acumula. Obtenha benefícios comprando!",
    },
    {
      question: "Como funciona a regra de pontos?",
      answer:
        "A cada R$ 1,00 em compras, acumule 1 ponto. Fácil, intuitivo e prático! Os pontos são cadastrados pelo estabelecimento no ato da compra através do app do Clubee e são visualizados através do seu perfil. Tem dúvidas ou não concorda sobre o saldo de pontos? Nós te ajudamos! É possível contestar a pontuação diretamente com  o estabelecimento ou enviando uma mensagem para nós!",
    },
    {
      question: "Por que devo baixar e usar o Clubee?",
      answer:
        "Porque o Clubee é muito além de um app de benefícios. Nele é possível visualizar os benefícios de outros estabelecimentos. Estão todos organizados em suas categorias e os estabelecimentos com melhores avaliações estarão em destaque no app.",
    },
    {
      question: "Quanto pago para utilizar o Clubee?",
      answer:
        "Nada, nadinha, nada MESMO! Gratuito. Só baixar, cadastrar e aproveitar!",
    },
    {
      question: "E o prazo para trocas?",
      answer:
        "No Clubee a quantidade de pontos e o prazo de trocas são coerentes. Prazo máximo de 03 meses com quantidade de pontos acessíveis para o cliente poder acumular. Mas sabe por quê? Os estabelecimentos que fazem parte da nossa colmeia, ops rede, são pequenos empreendedores com pequenos estoques, mas sempre cheios de novidade para os clientes. Logo, sempre tem benefícios incríveis te esperando. Nada mais chato do que ter sempre os mesmos benefícios, não é mesmo?",
    },
    {
      question: "Como saber quando trocar meus pontos?",
      answer:
        "No Clubee, ao ativar as notificações, você é lembrado quando já tem a quantidade de pontos necessária para trocas ou quando tem pontos para expirar. Aqui, diferentemente de cartões físicos que são perdidos ou não têm lembretes sobre suas pontuações, fica mais difícil expirar seus pontos e não realizar suas trocas.",
    },
    {
      question: "Tenho acesso ao meu saldo de pontos?",
      answer:
        "Sempre! Só entrar no app do Clubee e no perfil do Cliente e seu saldo sempre estará atualizado. Fácil assim!",
    },
    {
      question:
        "Posso trocar os pontos acumulados em qualquer estabelecimento independente do local de compra?",
      answer:
        "O objetivo do Clubee é fortalecer a economia de pequenos empreendedores em bairros mais populosos, deste modo, os pontos adquiridos em um estabelecimento devem ser trocados no próprio estabelecimento, auxiliando as vendas.",
    },
    {
      question:
        "Existe portabilidade do Clubee com outros programas de benefícios?",
      answer:
        "Não, o Clubee é recheado de oportunidades de produtos e serviços oferecidos por pequenos empreendedores, o que o torna muito completo na categoria.",
    },
    {
      question: "Posso transferir meus pontos para amigos e familiares?",
      answer:
        "Não, os pontos são intransferíveis. Mas vocês podem compartilhar boas experiências no app e auxiliar no acúmulo de pontos um do outro!",
    },
    {
      question: "Posso cancelar o Clubee?",
      answer: "Claro, quando quiser e sem custos. O difícil vai ser querer!",
    }, 
  ];

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <CaretLeft size={24} />
      </Pressable>
      <ScrollView style={styles.scrollView}>
        <FAQAccordion data={faqData} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: Constants.statusBarHeight
  },
  backButton: {
    alignSelf: 'flex-start', // Make sure the back button is aligned to the left
  },
  scrollView: {
    flex: 1, // Ensure ScrollView takes up the remaining space
    marginTop: 10,
  },
});

