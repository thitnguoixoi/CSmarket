import React, { useState } from "react";
import "./styles/Popup.css";


export default function Modal({text}) {
// Cac chuoi de dua vao footer
  const intro = "Welcome to CSMarket!\n\nOur website lets customer from all over the world open cases from CS2 game.\n\nAdd furnds to your virtual wallet via available payment menthods, i.a.: SMS, Bank transfer, Credit Card, Paysafecard, Skrill and many others.\n\nThousand of skins are waiting for you! Join the game and try your luck now. Satisfaction Guaranteed. ";
  
  const ques = "1. What is Steam Trade URL and how do I get it?\n\nAns: Steam Trade URL is a special link which lets you send and accept skins via Steam platform.\n\n\n2. I paid via ZEN but I did not receive funds?\nAns: Some payments are being verified by ZEN, it takes some time.If your funds did not arrive after 15 minutes please contact hello@zen.com.\n\n\n3. Can you give me a promocode?\n\nAns: I do not send promocodes in private messages. Promocodes are being posted on Facebook, Instagram and Twitter.\n\n\n4. What will happen if I do not withdraw my skin in 31 days?\n\nAns: Your skin will be automatically sold and you will receive $.\n\n\n5. Is it possible to advertise CSMarket for $?\n\nAns: Yes, you can dm me via FB or Discord. \n\n\n6. How can I contact you?\n\nAns: Please write an email to contact@csmarket.com or message me at Facebook, Discord.";

  const term = "\n\nI/ The Terms\n1. These Terms define the kind and range of services provided via electronic means by the Administrator and the rules for the use of the Website.\n\n2. The Terms are an integral part of the agreement formed with the user. Registering and creating a User's Account requires acquainting one's self with the Terms and expressing one's acceptance of the Terms.\n\n\n\nII/ Definitions\n1. Administrator  - website owner - Goup Cooker, Thu Duc, Vietnam, (+84) 1900-1009.\n\n2. User - any natural or juridical person or any other type of entity that has at least a limited legal capacity, that is using the Website according to the terms hereby stated, to sell (the 'Seller') or buy (the 'Buyer') goods or services through it. \n\n3. Website - an internet site with all the adequate technical, organizational and legal solutions, owned by the Administrator and available at the internet domain http://CSMarket, which enables the User to use the services provided by the Administrator.\n\n4. Publisher - Valve Corporation, the owner of all the rights for the Counter-Strike 2 software.\n\n5. Steam - a digital distribution and rights management platform, a multi-player system and a social media network owned by the Publisher that as an intermediary facilitates the connection between the Buyer and the Seller and the transactions they agree to through the Website.\n\n6. Item - a virtual, electronically recorded (at external servers) piece of the Counter Strike: Global Offensive software that can be traded between the Users per the Publisher's consent.\n\n7. User's Account - the Website's functionality connected with Steam's Individual User's Account.\n\n8. Steam Account - Steam platform's functionality made available for the User after registering as a subscriber of Stream service.\n\n9. Virtual wallet - it lets User add funds to his Account.\n\n10. Payment system operator - a third party company responsible for performing payment processing between the Users and the Website, that may take the form of bank transfers, credit or debit card payments, or other forms of payment.\n\n11. Third Parties' Terms and Conditions - Steam Terms and Conditions, Counter-Strike: Global Offensive Terms and Conditions, terms and conditions of payment through electronic means provided by a third party operator taking part in the transaction through the Website.\n\n\n\nIII/ Using the Service\n1. No individual under the age of eighteen (18) may use the Service.\n\n2. In order to be able to make use of the full functionality of the Website, which is restricted for registered users only, the User should log  in to the Website using his Steam platform account.\n\n3. Logging via Steam platform is safe. Service receives only public information that can be blocked by the User in his Steam Account profile settings.\n\n4. Reproduction, modification, alteration or development of the whole or any part of the multimedia  content (applications, films, music etc.), which are made available on-line to the end users in this service is prohibited, except the situation when it is evidently necessary to play/start and use the content\n\n5.  The use of this service is only permitted for private purposes, not connected with business activity.\n\n6. It is forbidden to create multi accounts. Such accounts will be permanently locked.\n\n\n\nIV/ How the Service works\n1. Service lets Users open virtual cases, which contains virtual items. After opening a virtual case User gets one item that it contains.\n\n2. User can sell or send an item he gets. Sent items cannot be returned by the User.\n\n3. When User decides to sell  an item funds are added to his Virtual wallet.\n\n4. If user does not make a decision to send or sell an item in 31 days item will be automatically sold.\n\n5. In order to receive an item User must send it via his user panel.\n\n6. Item is sent automatically by the BOT.\n\n7. In order to receive an item User must accept BOT's offer.\n\n8. Due to Steam 7 days trade lock some items might not be withdrawable instantly. In such a case User can exchange the item to another one.\n\n9. Service does not take the responsibility if the User provides incorrect Steam Trade URL.\n\n10. Service does not take the responsibility if the User is unable to accept BOT's offer.\n\n11. If the sent item is not accepted by the User within 31 days it will be automatically sold and User will receive funds to his Virtual wallet.\n\n12. If the User receives a trade offer, but rejects it, he is not entitled to a refund. The customer will not receive funds from the rejected item.\n\n13. Users cases opened by \"Advertising accounts\" do not generate refshare funds.\n\n\n\nV/ Complaints\n1. The User can contact the Administrator about the services provided on the basis of these Terms by writing a message to: contact@CSMarket.\n\n2. The User can lodge a complaint if the services enumerated in these Terms are not provided by the Administrator or are provided not in accordance with the Terms.\n\n3. The complaint should contain at least the User\'s login and the description of the problems the User wants to complaint about.\n\n4. If the data or information provided in the complaint require completion, the Administrator will ask the User to do so.\n\n5. The Administrator has 14 days since receiving the complaint in a proper form to consider it. The Administrator, however may refuse to consider the complaint if it\'s lodged more than 14 days after the reason for lodging the complaint became evident.\n\n6. The Administrator responds to the complaint by sending a message to a User email address.\n\n7. By adding fund to your CSMarket wallet, you accept that the credits received (labeled by the $-sign) are not worth real money and not subject to any refunds.\n\n8. Terms of Service is governed in all aspects by the law of Vietnam. Any claim arising out of it shall be resolved exclusively by the competent court having jurisdiction in Vietnam ,unless the law in your country of residence allows you to choose the courts of that country for the dispute in question.";

  const policy = "I/ Privacy policy\n1. The User expresses his consent for the Administrator to proceed his personal data provided in the process of registering the User\'s Account and in the process of using the Website, including the money payments through the website.\n\n2. The User provides his personal data voluntarily, but failing to express the consent to data processing may make it impossible for the Website to provide its services to the User, including the ability to purchase or sell Items through the Website.\n\n3. If the User expresses an additional consent his personal data might be used for marketing purposes, particularly for sending him commercial information using electronic means.\n\n\n\nII/ Refund policy\n1. CSMarket products are qualified as digital content (virtual items) which is exempt from the general withdrawal right due to their specifics upon the consumer’s prior express consent.\n\nBy agreeing to this refund policy and making a purchase you expressly consent to the loss of your right of withdrawal and waive any rights in connection thereto.\n\nBy adding funds to your CSMarket wallet, you accept that the credits received (labeled by the $-sign) are not worth real money and not subject to any refunds.";

  const cookie_policy = "We only use cookie for authentication purpose."; 

// Ham de dua content vao footer dua theo input
 function addText(text){
  if(text === "About us") return intro;
  if(text === "Usual question") return ques;
  if(text === "Terms and services") return term;
  if(text === "Policies") return policy;
  if(text === "Cookie policies") return cookie_policy;
 }


  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">{text}</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{text}</h2>
            <p style={{ whiteSpace: 'pre-line'}}>
              {addText(text)}
            </p>
            <button className="close-modal" onClick={toggleModal}>X</button>
          </div>
        </div>
      )}
    </>
  );
}