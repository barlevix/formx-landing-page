import { useEffect } from "react";
import "../formx.css";
import { useFormX } from "../useFormX";

/*
 * FormX landing page.
 *
 * The markup and stylesheet are carried over verbatim from the standalone site
 * so the design stays pixel-identical to the Figma file. Everything is wrapped
 * in .formx because in a Base44 app this is mounted inside the host page rather
 * than owning <body>.
 *
 * All behaviour lives in useFormX(); content comes from public/content.json.
 */
export default function Home() {
  useFormX();

  useEffect(() => {
    document.title = "FormX — A Second Home, Right at Home";
  }, []);

  return (
    <div className="formx">
      <a className="skip-link" href="#quiz">Skip to the free assessment form</a>

      <div className="layout">

        {/* ══════════════════════════ MAIN COLUMN ══════════════════════════ */}
        <main className="main" id="main">

          {/* ─────────────── HERO ─────────────── */}
          <section className="hero" aria-label="Introduction">
            <video className="hero__media" poster="/assets/img/hero-poster.jpg"
                   autoPlay muted={true} loop={true} playsInline preload="metadata" aria-hidden="true" tabIndex="-1">
              <source src="/assets/video/hero.mp4" type="video/mp4" />
            </video>

            <img className="hero__logo hero__logo--light" src="/assets/svg/logo-light.svg" alt="FormX" width="134" height="26" />
            <img className="hero__logo hero__logo--dark"  src="/assets/svg/logo-dark.svg"  alt="FormX" width="112" height="22" />

            <div className="hero__copy">
              <h1 className="hero__title">A Second Home,<br />Right at Home</h1>
              <div className="hero__proof">
                <span className="hero__google" role="img" aria-label="Rated 5 out of 5 on Google"><img src="/assets/img/google-rating.png" alt="" /></span>
                <p className="hero__sub">Guest suite, in-law home or rental unit - architect-designed, fully custom, built in weeks.</p>
              </div>
            </div>
          </section>

          {/* ─────────────── GOOGLE REVIEW MARQUEE ─────────────── */}
          <section className="reviews" aria-label="Google reviews">
            <div className="reviews__viewport">
              <div className="reviews__track" id="reviewsTrack">
                {/* filled by script.js (two identical runs for a seamless loop) */}
              </div>
            </div>
            <button className="cta cta--inline" type="button" data-open-quiz>Get FREE assessment Now</button>
          </section>

          {/* ─────────────── PROCESS ─────────────── */}
          <section className="process" aria-labelledby="process-title">
            <h2 className="process__title" id="process-title">Fully custom.<br />From plans to keys.</h2>

            <div className="process__visual" aria-hidden="true">
              <span className="process__word">From</span>
              <img className="process__gif" src="/assets/img/wireframes.gif" alt="" width="369" height="294" loading="lazy" />
              <span className="process__word">to</span>
              <img className="process__keys" src="/assets/img/keys.jpg" alt="" width="189" height="240" loading="lazy" />
            </div>

            <ol className="steps">
              <li className="step">
                <span className="step__num" aria-hidden="true">1.</span>
                <img className="step__icon" src="/assets/svg/iconDesigned.svg" alt="" width="22" height="22" loading="lazy" />
                <h3 className="step__title">Designed for you</h3>
                <p className="step__body">Custom-designed for your property, needs, and vision.</p>
              </li>
              <li className="step">
                <span className="step__num" aria-hidden="true">2.</span>
                <img className="step__icon" src="/assets/svg/iconPermits.svg" alt="" width="18" height="23" loading="lazy" />
                <h3 className="step__title">Permits handled</h3>
                <p className="step__body">We manage all permits, approvals, and requirements.</p>
              </li>
              <li className="step">
                <span className="step__num" aria-hidden="true">3.</span>
                <img className="step__icon" src="/assets/svg/iconBuilt.svg" alt="" width="19" height="20" loading="lazy" />
                <h3 className="step__title">Built to completion</h3>
                <p className="step__body">We manage construction with premium quality throughout.</p>
              </li>
            </ol>
          </section>

          {/* ─────────────── PROJECT GALLERY ─────────────── */}
          <section className="work" aria-labelledby="work-title">
            <h2 className="work__title" id="work-title">California,<br />You’re welcome.</h2>

            <div className="work__scroller">
              <ul className="work__track" id="workTrack">
                {/* filled by script.js */}
              </ul>
            </div>

            <div className="work__nav">
              <button className="work__arrow" type="button" data-scroll="prev" aria-label="Previous project" aria-controls="workTrack">
                <svg viewBox="0 0 13 24" aria-hidden="true"><path d="M12 .35 .7 11.85 12 23.35" /></svg>
              </button>
              <button className="work__arrow" type="button" data-scroll="next" aria-label="Next project" aria-controls="workTrack">
                <svg viewBox="0 0 13 24" aria-hidden="true"><path d="M1 .35 12.3 11.85 1 23.35" /></svg>
              </button>
            </div>
          </section>

          {/* ─────────────── STRENGTHS ─────────────── */}
          <section className="strengths" aria-label="Why FormX">
            <ul className="strengths__grid">
              <li className="strength">
                <span className="strength__icon" data-icon="0" aria-hidden="true"><img src="/assets/img/strengths-sprite.png" alt="" /></span>
                <h3 className="strength__title">Fully customizable</h3>
                <p className="strength__body">Any size, any shape, any design. The only limit is your imagination.</p>
              </li>
              <li className="strength">
                <span className="strength__icon" data-icon="1" aria-hidden="true"><img src="/assets/img/strengths-sprite.png" alt="" /></span>
                <h3 className="strength__title">Transparent pricing</h3>
                <p className="strength__body">What you see is what you get. No hidden fees and no surprises.</p>
              </li>
              <li className="strength">
                <span className="strength__icon" data-icon="2" aria-hidden="true"><img src="/assets/img/strengths-sprite.png" alt="" /></span>
                <h3 className="strength__title">Stress-free permits</h3>
                <p className="strength__body">We work with your city to get you the permits you need</p>
              </li>
              <li className="strength">
                <span className="strength__icon" data-icon="3" aria-hidden="true"><img src="/assets/img/strengths-sprite.png" alt="" /></span>
                <h3 className="strength__title">Lightning<br />fast</h3>
                <p className="strength__body">We challenge you to find anyone who can deliver faster than us.</p>
              </li>
            </ul>

            <button className="cta cta--inline" type="button" data-open-quiz>Get FREE assessment Now</button>
          </section>

          {/* ─────────────── SPACES (hover / scroll reveal) ─────────────── */}
          <section className="spaces" aria-labelledby="spaces-title">
            <h2 className="spaces__title" id="spaces-title">Future Living, Today</h2>
            <ul className="spaces__grid" id="spacesGrid">
              {/* filled by script.js */}
            </ul>
          </section>

          {/* ─────────────── FOOTER ─────────────── */}
          <footer className="footer">
            <video className="footer__media" poster="/assets/img/footer-poster.jpg"
                   muted={true} loop={true} playsInline preload="none" aria-hidden="true" tabIndex="-1"
                   data-lazy-video="/assets/video/footer.mp4"></video>

            <div className="footer__copy">
              <h2 className="footer__title">Every home starts with a conversation.</h2>
              <p className="footer__sub">Let our team guide you from first sketch to move-in day.</p>
            </div>
            <button className="cta cta--inline cta--onDark" type="button" data-open-quiz>Get FREE assessment Now</button>
            <span className="footer__rule" aria-hidden="true"></span>

            <p className="footer__legal">© <span id="year"></span> FormX</p>
          </footer>
        </main>

        {/* ══════════════════════════ QUIZ — sticky rail / mobile sheet ══════════════════════════ */}
        <aside className="rail" id="quiz" aria-label="Free assessment">
          <button className="rail__grab" type="button" id="railGrab" aria-expanded="false" aria-controls="railPanel">
            <span className="rail__grabBar" aria-hidden="true"></span>
            <span className="sr-only">Open the free assessment form</span>
          </button>

          <div className="rail__panel" id="railPanel">

            <div className="rail__byline">
              <p className="rail__bylineLabel">Get FREE assessment by</p>
              <div className="rail__person">
                <img className="rail__avatar" src="/assets/img/maria.jpg" alt="" width="45" height="45" loading="lazy" />
                <span className="rail__name">Maria Giuliani</span>
                <span className="rail__role">Senior Architect at FormX</span>
              </div>
            </div>

            <form className="quiz" id="quizForm" noValidate>
              <div className="quiz__body">

                {/* Step 1 — from the design */}
                <fieldset className="quiz__step is-active" data-step="1">
                  <legend className="sr-only">What kind of property is this for?</legend>
                  <h2 className="quiz__title">See what's possible for your property</h2>
                  <p className="quiz__sub">Answer a few quick questions and get expert guidance within 4 business hours!</p>
                  <div className="quiz__options" role="radiogroup" aria-label="Property type">
                    <label className="opt"><input type="radio" name="property" value="Single-family home" required={true} /><span>Single-family home</span></label>
                    <label className="opt"><input type="radio" name="property" value="Multi-family housing" /><span>Multi-family housing</span></label>
                    <label className="opt"><input type="radio" name="property" value="ADU or guest house" /><span>ADU or guest house</span></label>
                    <label className="opt"><input type="radio" name="property" value="Commercial space" /><span>Commercial space</span></label>
                    {/* Figma repeats "Single-family home" here; shipping two identical radios
                         would be broken, so the fifth option reads "Not sure yet". */}
                    <label className="opt"><input type="radio" name="property" value="Not sure yet" /><span>Not sure yet</span></label>
                  </div>
                </fieldset>

                {/* Step 2 — NOT IN FIGMA. The design only specifies step 1; these two
                     steps exist so the "Continue" button leads somewhere. Placeholder copy. */}
                <fieldset className="quiz__step" data-step="2">
                  <legend className="sr-only">When would you like to start?</legend>
                  <h2 className="quiz__title">When would you like to start?</h2>
                  <p className="quiz__sub">This helps us line up the right architect and permit timeline for you.</p>
                  <div className="quiz__options" role="radiogroup" aria-label="Timeline">
                    <label className="opt"><input type="radio" name="timeline" value="As soon as possible" /><span>As soon as possible</span></label>
                    <label className="opt"><input type="radio" name="timeline" value="In 1–3 months" /><span>In 1–3 months</span></label>
                    <label className="opt"><input type="radio" name="timeline" value="In 3–6 months" /><span>In 3–6 months</span></label>
                    <label className="opt"><input type="radio" name="timeline" value="Just exploring" /><span>Just exploring</span></label>
                  </div>
                </fieldset>

                {/* Step 3 — NOT IN FIGMA. Placeholder copy. */}
                <fieldset className="quiz__step" data-step="3">
                  <legend className="sr-only">Where should we send your assessment?</legend>
                  <h2 className="quiz__title">Where should we send it?</h2>
                  <p className="quiz__sub">Maria will come back to you within 4 business hours. No obligation, no sales pressure.</p>
                  <div className="quiz__fields">
                    <label className="field">
                      <span className="field__label">Full name</span>
                      <input className="field__input" type="text" name="name" autocomplete="name" placeholder="Jane Rivera" />
                    </label>
                    <label className="field">
                      <span className="field__label">Email</span>
                      <input className="field__input" type="email" name="email" autocomplete="email" placeholder="jane@example.com" />
                    </label>
                    <label className="field">
                      <span className="field__label">Phone <span className="field__opt">(optional)</span></span>
                      <input className="field__input" type="tel" name="phone" autocomplete="tel" placeholder="(408) 555-0134" />
                    </label>
                    <label className="field">
                      <span className="field__label">Project address or city <span className="field__opt">(optional)</span></span>
                      <input className="field__input" type="text" name="city" autocomplete="address-level2" placeholder="San Jose, CA" />
                    </label>
                  </div>
                </fieldset>

                {/* Done */}
                <div className="quiz__step quiz__done" data-step="done" role="status">
                  <h2 className="quiz__title">Thank you — you’re on Maria’s list.</h2>
                  <p className="quiz__sub">We’ll be in touch within 4 business hours with what’s possible on your property.</p>
                  <p className="quiz__notWired" id="quizNotWired" hidden={true}>
                    <strong>Not connected yet.</strong> No lead endpoint is configured, so this
                    enquiry was not sent anywhere. Set <code>LEAD_ENDPOINT</code> in <code>script.js</code>.
                  </p>
                </div>

              </div>

              <p className="quiz__error" id="quizError" role="alert" hidden={true}></p>

              <div className="quiz__foot">
                <button className="quiz__back" type="button" id="quizBack" hidden={true}>Back</button>
                <button className="cta" type="submit" id="quizNext">Continue</button>
                <ol className="quiz__dots" aria-hidden="true">
                  <li className="is-on"></li><li></li><li></li>
                </ol>
              </div>
            </form>
          </div>
        </aside>
      </div>

      <div className="scrim" id="scrim" hidden={true}></div>

      {/* ══════════════════════════ PROJECT LIGHTBOX ══════════════════════════ */}
      <dialog className="lb" id="lightbox" aria-labelledby="lbTitle">
        <div className="lb__head">
          <div>
            <h2 className="lb__title" id="lbTitle"></h2>
            <p className="lb__place" id="lbPlace"></p>
          </div>
          <button className="lb__close" type="button" id="lbClose" aria-label="Close project gallery">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>
        <ul className="lb__tags" id="lbTags"></ul>
        <p className="lb__desc" id="lbDesc" hidden={true}></p>
        <div className="lb__grid" id="lbGrid"></div>
        <p className="lb__quote" id="lbQuote"></p>
        <div className="lb__foot">
          <button className="cta" type="button" data-open-quiz>Get FREE assessment Now</button>
          <a className="lb__link" id="lbLink" href="#" target="_blank" rel="noopener" hidden={true}>View on formx.com</a>
        </div>
      </dialog>
    </div>
  );
}
