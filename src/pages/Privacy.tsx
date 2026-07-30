import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-ink text-bone py-24 md:py-32">
      <div className="container-editorial max-w-3xl">
        <Link to="/" className="text-overline text-bone-dim link-underline">← На главную</Link>
        <h1 className="font-display text-editorial-lg text-bone mt-8 mb-10">
          Политика <span className="italic text-gold">конфиденциальности</span>
        </h1>

        <div className="space-y-8 text-bone-dim leading-relaxed">
          <section>
            <h2 className="text-overline text-gold mb-3">1. Общие положения</h2>
            <p>
              Настоящая Политика разработана в соответствии с Федеральным законом РФ
              №152-ФЗ «О персональных данных» и определяет порядок обработки и защиты
              персональных данных пользователей сайта novastrada.ru (далее — Оператор).
            </p>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">2. Какие данные мы собираем</h2>
            <p>
              При отправке заявки через сайт мы собираем: имя, название бренда,
              адрес электронной почты, номер телефона, объём планируемой партии и
              описание проекта. Также автоматически фиксируются технические данные
              (cookie, IP-адрес, тип браузера, источник перехода).
            </p>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">3. Цели обработки</h2>
            <p>
              Связь с пользователем по поводу заявки, подготовка коммерческого
              предложения, отправка ответов и сопроводительных материалов, улучшение
              работы сайта и аналитика.
            </p>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">4. Cookies</h2>
            <p>
              Сайт использует файлы cookie для корректной работы интерфейса и
              анонимной аналитики. Вы можете отключить cookie в настройках браузера —
              некоторые функции при этом могут работать некорректно.
            </p>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">5. Передача третьим лицам</h2>
            <p>
              Оператор не передаёт персональные данные третьим лицам, за исключением
              случаев, прямо предусмотренных законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">6. Права пользователя и отзыв согласия</h2>
            <p>
              Вы вправе запросить удаление, изменение или предоставление информации о
              ваших персональных данных, а также отозвать согласие на их обработку в
              любой момент, отправив запрос на{" "}
              <a href="mailto:vitastrada@mail.ru" className="text-bone link-underline break-all">
                vitastrada@mail.ru
              </a>
              . Запрос рассматривается в течение 30 дней. После отзыва согласия данные
              удаляются, если иное не предусмотрено законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">7. Срок хранения</h2>
            <p>
              Персональные данные хранятся не дольше, чем этого требуют цели обработки —
              как правило, не более 3 лет с момента последнего обращения, — после чего
              уничтожаются или обезличиваются.
            </p>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">8. Меры защиты</h2>
            <p>
              Оператор принимает правовые, организационные и технические меры для защиты
              персональных данных от неправомерного доступа, уничтожения, изменения,
              копирования и распространения (шифрование канала передачи, разграничение
              доступа, регламент работы с данными).
            </p>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">9. Реквизиты Оператора</h2>
            <div className="space-y-1">
              <p>Наименование: Nova &amp; Strada (контрактное швейное производство)</p>
              <p>
                Адрес производства: Усковский проезд, 2, деревня Голиково, городской округ
                Химки, Московская область
              </p>
              <p>
                E-mail:{" "}
                <a href="mailto:vitastrada@mail.ru" className="text-bone link-underline break-all">
                  vitastrada@mail.ru
                </a>
              </p>
              <p>
                Телефон:{" "}
                <a href="tel:+79818334231" className="text-bone link-underline font-mono">
                  +7 981 833 42 31
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-overline text-gold mb-3">10. Изменения</h2>
            <p>
              Оператор вправе вносить изменения в настоящую Политику. Актуальная
              редакция всегда доступна по адресу /privacy.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
