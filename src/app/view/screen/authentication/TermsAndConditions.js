import { StyleSheet, ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import CustomText from "../../../../components/CustomText";

const TermsAndConditions = () => {
  return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        >
          <View style={{ alignSelf: "flex-start", marginLeft: 25 }}>
            <Link href="/signupUser">
              <MaterialIcons name="arrow-back-ios-new" size={30} color="black" />
            </Link>
          </View>
          <View>
            <CustomText style={styles.header}>Termos e Condições</CustomText>
          </View>

          <View style={styles.defaultSizeView}>
            <CustomText style={styles.mainText}>
              Ao efetuar o seu cadastro no Clubee, você estará aceitando nossos termos e condições, assim como de nossos parceiros. A adesão ao Clubee e seus benefícios são oferecidos a exclusivo dos Estabelecimentos Parceiros e a Equipe de administração do Clubee, que se reserva o direito de alterar as regras a qualquer momento, no todo ou em parte, independentemente de prévia notificação.
            </CustomText>
          </View>

          <View style={styles.defaultSizeView}>
            <CustomText style={styles.headerText}>1.{"     "}INTRODUÇÃO</CustomText>
            <CustomText style={styles.text}>Obrigado pelo interesse em participar do Clubee, um programa desenvolvido e mantido pela SouJuniorLabs.</CustomText>
            <CustomText style={styles.text}>Antes de prosseguir com seu cadastro, é fundamental que você leia e compreenda todos os termos e condições que regulam a utilização do Clubee de seus benefícios. Esta é a função deste contrato, redigido de forma clara, em linguagem acessível e na melhor forma do direito.</CustomText>
            <CustomText style={styles.text}>Ao se cadastrar no Clubee, você estará legalmente vinculado a todos os termos e condições aqui presentes, portanto, você assume total capacidade legal para tal tipo de contratação. Caso você não concorde com qualquer das regras previstas, você não poderá participar do Clubee</CustomText>
            <CustomText style={styles.text}>Dentro dos aspectos deste contrato, você passa ser denominado como membro do Clube de Vantagens Clubee.</CustomText>
            <CustomText style={styles.text}>Caso tenha qualquer dúvida sobre o conteúdo desse termo, entre em contato com nosso suporte através do e-mail clubeefidelidade@gmail.com</CustomText>
          </View>

          <View style={styles.defaultSizeView}>
            <CustomText style={styles.headerText}>2.{"     "}O CLUBEE</CustomText>
            <CustomText style={styles.text}>2.1. O Clubee disponibiliza uma plataforma virtual, por meio de aplicativos para celular (mobile), denominados neste contrato como App, com os seguintes objetos:</CustomText>
            <CustomText style={styles.text}>2.1.1. Divulgação e mecanismo de busca de ofertas e descontos, assim como participações em promoções e campanhas, de diversos estabelecimentos comerciais, redes de lojas, que são denominados neste contrato como Estabelecimentos.</CustomText>
            <CustomText style={styles.text}>2.1.2. Programa de pontuação virtual para os participantes do clube de vantagens, no qual os Usuários acumulam pontos em compras nos Estabelecimentos parceiros, podendo trocar esta pontuação virtual por produtos, serviços e descontos, ficando o tipo de troca a critérios de cada Estabelecimento.</CustomText>
            <CustomText style={styles.text}>2.1.3. Divulgação de mensagens ou mídias, de marketing ou de caráter comercial, que podem ser enviadas para todos os Usuários que expressem, prévia e explicitamente, o consentimento em recebê-las, pelo aceite deste instrumento de termos e condições. </CustomText>
            <CustomText style={styles.text}>2.2. O Clubee não vende qualquer produto ou serviço para os Usuários no seu App. Apenas veicula anúncios de produtos, descontos e serviços fornecidos pelos Estabelecimentos. Por essa razão, nós não nos responsabilizamos por nenhuma compra ou transação realizada entre vocês e os Estabelecimentos.</CustomText>
            <CustomText style={styles.text}>2.3. Os anúncios veiculados no App podem conter informações sobre alguns produtos ou serviços, incluindo preço. No entanto, você deve sempre conferir o preço e demais informações dos produtos diretamente com os Estabelecimentos, pois alguns dos anúncios podem estar desatualizados ou com outras intemperes relacionadas a divulgação.</CustomText>
            <CustomText style={styles.text}>2.4. Sempre que houver diferença ou divergência entre os preços e demais informações de produtos no App e diretamente com os Estabelecimentos, prevalecerá as informações dos Estabelecimentos.</CustomText>
            <CustomText style={styles.text}>2.5. O Clubee contém a tecnologia de geolocalização de propriedade da In Loco Tecnologia da Informação S.A. Esta tecnologia permite a captura dos dados de localização do seu dispositivo móvel, sem qualquer obtenção de dados pessoais dos proprietários do dispositivo, ou seja, de forma anônima, de maneira que você possa receber anúncios publicitários mais efetivos no aplicativo.</CustomText>
            <CustomText style={styles.text}>2.6. Para utilização do programa de fidelização os Usuários devem sempre identificar suas compras no Clubee, conforme tecnologia divulgada e disponibilizada para tal fim pelo Clubee e o Estabelecimento. O Clubee se reserva ao direito de validar o código do Usuário em suas compras, para este fim.</CustomText>
            <CustomText style={styles.text}>2.7. Cada compra identificada dará ao Usuário pontos, caracterizados como Clubee, que são geridos pelos mesmos e podem ser permutados por vantagens dentro do APP do Clubee.</CustomText>
            <CustomText style={styles.text}>2.8. Somente estarão aptas para pontuação as compras identificadas que ocorreram nos últimos 07 dias do ato da identificação.</CustomText>
            <CustomText style={styles.text}>2.9 R$ 1,00 é 1 ponto sem valor mínimo para começar a pontuar.</CustomText>
            <CustomText style={styles.text}>2.10 Prazo de resgate: Após solicitação de resgate o cliente tem 15 dias para adquirir sua bonificação, mesmo a promoção ter sido finalizada, desde que o pedido de resgate tenha sido realizado dentro do prazo:</CustomText>
            <CustomText style={styles.text}>2.11. As vantagens permutáveis pelo Clubee são prêmios, serviços ou descontos, devidamente divulgados dentro do App.</CustomText>
            <CustomText style={styles.text}>2.12. Após troca dos pontos por descontos ou produtos, o Usuário estará sujeito as regras definidas por estes. Qualquer infração ao regulamento dos Estabelecimentos pode acarretar em sua inelegibilidade para pontuação no programa.</CustomText>
            <CustomText style={styles.text}>2.13. O prazo para conclusão das trocas pelo Estabelecimento Parceiro é de 07 (sete) dias úteis após a sua solicitação via APP do Clubee.</CustomText>
            <CustomText style={styles.text}>2.14. A quantidade necessária de pontos para troca ofertadas é de exclusiva responsabilidade do Clubee, que se reserva ao direito de estabelecer ou alterar estas quantidades para troca a qualquer momento, independentemente de prévia notificação.</CustomText>
            <CustomText style={styles.text}>2.15. Caso você entenda que ocorreu algum erro no recebimento dos pontos ou algum equívoco na sua troca, você poderá abrir uma reclamação, enviando e-mail para clubeefidelidade@gmail.com, com as seguintes informações:</CustomText>
            <CustomText style={styles.text}>2.15.1. Você deverá nos informar a data do ocorrido, o estabelecimento, o código Clubee e a chave de acesso do documento fiscal.</CustomText>
            <CustomText style={styles.text}>2.15.2. Podemos solicitar alguma informação adicional, no intuito de solucionar sua reclamação.</CustomText>
            <CustomText style={styles.text}>2.15.3. A reclamação será periodicamente acompanhada e atualizada por nós, e o canal de atendimento estará sempre apto a atende-lo, mas é importante que você saiba que podemos levar alguns dias para analisar as informações.</CustomText>
            <CustomText style={styles.text}>2.15.4. Se identificarmos uma reclamação falsa, fraudulenta ou de má-fé, sua conta no Clubee o Usuário poderá ser excluído, com a automática expiração de eventual saldo.</CustomText>
            <CustomText style={styles.text}>2.16. O seu saldo de pontos é cumulativo, e vai aumentando a cada compra confirmada. Os valores não tem qualquer característica monetária ou moeda virtual, e não estão sujeitos a correção monetária por qualquer forma.</CustomText>
          </View>

          <View style={styles.defaultSizeView}>
            <CustomText style={styles.headerText}>3.{"     "}RESPONSABILIDADES</CustomText>
            <CustomText style={styles.text}>3.1. Os dados individuais dos Usuários serão armazenados em nossos sistemas, de forma confidencial e segura. Não faremos nenhuma utilização indevida destas informações.</CustomText>
            <CustomText style={styles.text}>3.2. As informações prestadas no cadastro devem ser exatas, precisas e verdadeiras, e você se compromete a atualizar o cadastro sempre que houver alguma alteração nos seus dados. Nós poderemos nos utilizar de todos os meios legais para confirmar a veracidade desses dados, embora não nos responsabilizemos, em hipótese nenhuma, por dados incorretos ou não verdadeiros informados por você. Isto é, você nos garante e assume responsabilidade pela veracidade, exatidão e autenticidade de todos os dados que nos fornecer.</CustomText>
            <CustomText style={styles.text}>3.3. Após a conclusão do cadastro, você terá uma identificação de usuário (EMAIL) e uma senha. Esta identificação de usuário e senha são de uso pessoal e intransferível, não podendo ser repassados a terceiros. O Usuário assume, portanto, total responsabilidade por sua guarda e sigilo, com a obrigação de evitar que sejam utilizados por outras pessoas.</CustomText>
            <CustomText style={styles.text}>3.4. Recomendamos que o Usuário mude a sua senha periodicamente, e que não utilize senhas que facilitem a adivinhação por terceiros, como números de telefone, endereço, datas de nascimento, nomes de parentes, etc.</CustomText>
            <CustomText style={styles.text}>3.5. Caso o usuário não efetue login no Clubee por 12 (doze) meses, seu saldo de pontos poderá expirar e ser zerado, não tendo mais o direito sobre esta pontuação acumulada.</CustomText>
            <CustomText style={styles.text}>3.6. Os pontos do Clubee têm validade de 03 meses, a contar do crédito da pontuação. Após este período, os pontos serão estornados do seu saldo acumulado.</CustomText>
            <CustomText style={styles.text}>3.7. É muito importante que você saiba que o Clubee tem prazo de operação indeterminado, mas que o mesmo poderá ser suspendido ou cancelado a qualquer momento, sem necessidade de notificação prévia. Nessa ocasião, os Usuários terão um prazo de 30 (trinta) dias contados da data de cancelamento do programa para solicitar o resgate da pontuação de sua conta. Após esse prazo, os Usuários não poderão mais realizar o resgate da pontuação ou prêmios acumulados e o Clubee não poderá ser responsabilizado por tentativas de resgate fora deste calendário.</CustomText>
            <CustomText style={styles.text}>3.8. É de responsabilidade do Usuário manter os meios eletrônicos que você utiliza para acessos ao App do Clubee protegidos contra vírus e outros malwares. Dessa forma, não nos responsabilizamos por danos causados por vírus e malwares em decorrência de acesso, utilização ou navegação no App.</CustomText>
            <CustomText style={styles.text}>3.9. É de responsabilidade do Usuário expressar a vontade de não receber mais mensagens e/ou mídias comerciais pelo App do Clubee, se descadastrando do programa com a exclusão do perfil (opt-out)</CustomText>
          </View>

          <View style={[styles.defaultSizeView, { marginBottom: 50 }]}>
          <CustomText style={styles.headerText}>4.{"     "}OUTROS ASSUNTOS</CustomText>
          <CustomText style={styles.text}>4.1. O Clubee poderá, a qualquer momento dentro dos critérios estabelecidos, modificar a configuração do App, podendo também eliminar ou acrescentar quaisquer Estabelecimentos cadastrados.</CustomText>
          <CustomText style={styles.text}>4.2. Todo o conteúdo (incluindo, mas não se limitando a marcas, modelos, textos, softwares, sons, fotos e outros itens disponíveis no App), a aparência, a organização e a estrutura do Clubee são protegidas pela legislação de propriedade intelectual. A violação de tais direitos ensejará a indenização aos prejudicados, sem prejuízo de perdas e danos e honorários advocatícios.</CustomText>
          <CustomText style={styles.text}>4.3. É vedado ao usuário modificar, copiar, distribuir, reproduzir, publicar, disponibilizar, licenciar ou criar obras derivadas a partir do conteúdo ou das informações coletadas no App, bem como transferir ou vender tais informações, sob pena de violação do presente termo e infração legal.</CustomText>
          <CustomText style={styles.text}>4.4. Não é permitido que uma mesma pessoa tenha mais de um cadastro no Clubee. Se detectarmos tal infração, através do sistema de verificação de dados, podemos inabilitar definitivamente o cadastro mais recente.</CustomText>
          <CustomText style={styles.text}>4.5. O Clubee poderá advertir, suspender ou cancelar, temporária ou definitivamente, a conta de um usuário a qualquer momento e tomar as medidas legais cabíveis se:</CustomText>
          <CustomText style={styles.text}>4.5.1. O usuário não cumprir qualquer dispositivo desses Termos de Uso;</CustomText>
          <CustomText style={styles.text}>4.5.2. Se praticar atos fraudulentos ou dolosos;</CustomText>
          <CustomText style={styles.text}>4.5.3. Não cumprir com o regulamento dos Estabelecimentos Parceiros;</CustomText>
          <CustomText style={styles.text}>4.5.4. Se o Usuário divulgar ou postar conteúdo em desacordo com a legislação vigente, com os bons costumes, ou ofensivo ao direito de qualquer pessoa; e</CustomText>
          <CustomText style={styles.text}>4.5.5. Praticar SPAM ou qualquer tipo de atitude contrária às boas práticas da internet e das redes sociais em nome, ou mediante, o Clubee.</CustomText>
          <CustomText style={styles.text}>4.6. Este Termos de Uso constitui o documento jurídico integral para regular a relação. Os termos contidos neste instrumento poderão ser modificados livremente pela Equipe do Clubee, sem qualquer aviso ou notificação, bastando a divulgação de novo instrumento. Os novos termos terão validade a partir da data em que forem publicados no App do Clubee, tendo o usuário o direito de permanecer cadastrado, ou não, perante esta novação.</CustomText>
          <CustomText style={styles.text}>4.7. Se houver algum conflito entre este contrato e outros documentos, prevalecerão sempre os termos deste contrato, que é o documento formal eleito para reger a relação Usuário e p Clubee.</CustomText>
          <CustomText style={styles.text}>4.8. Por fim, caso seja necessário dirimir qualquer dúvida ou controvérsia decorrente deste contrato, o foro eleito é o de Salvador/BA, em detrimento de qualquer outro, por mais privilegiado que seja.</CustomText>
          <CustomText style={styles.text}>4.9. Ao realizar seu cadastro, confirma que leu e concorda com todos os nossos termos e condições, se tornando um Usuário do Clubee.</CustomText>
          </View>


      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    zIndex: 10,
    backgroundColor: 'rgba(247, 247, 247, 1)'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30
  },
  defaultSizeView: {
    marginHorizontal: 30,
    marginTop: 40
  },
  mainText: {
    fontSize: 19,
    fontWeight: '800'
  },
  headerText: {
    fontWeight: '800',
    fontSize: 17,
    marginBottom:10
  },
  text: {
    fontWeight: 'thin',
    fontSize: 15,
    lineHeight: 19,
    marginBottom: 7
  }
});

export default TermsAndConditions;