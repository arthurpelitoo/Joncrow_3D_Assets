        <img class="backgroundImage" src="<?= BASE_URL ?>assets/contact_page_image/contactbackground1.avif" alt="Contact-BG">
        <div id="modal-container" class="modal-container"></div>
        <div id="modal-overlay" class="modal-overlay"></div>
        <section class="sectionSpace">
            <div class="container">
                <h1 class="faixaTitle">
                    Send a Message
                </h1>
                <form action="https://formsubmit.co/joncraucolecoes@gmail.com" id="formId" method="POST" target="_blank" class="col-12 formContato" name="formContato">
                    
                    <fieldset class="step active">
                        <label for="referencia" class="labelForm">How did you find this website? *</label>
                        <select class="inputForm" name="referencia" id="referencia">
                            <option value="">Select</option>
                            <option value="Google">Google</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Recommendation">Recommendation</option>
                            <option value="Other">Other</option>
                        </select>
                        <button type="button" class="next">Next</button>
                    </fieldset>

                    <fieldset class="step">
                        <label for="nome" class="labelForm">Enter your name: *</label>
                        <input class="inputForm" type="text" name="nome" id="nome" placeholder="Enter your name">
                        <fieldset class="btngroup">
                            <button type="button" class="prev">Prev</button>
                            <button type="button" class="next">Next</button>
                        </fieldset>
                    </fieldset>

                    <fieldset class="step">
                        <label for="email" class="labelForm">Enter your email: *</label>
                        <input class="inputForm" type="text" name="email" id="email" placeholder="Enter your email">
                        <fieldset class="btngroup">
                            <button type="button" class="prev">Prev</button>
                            <button type="button" class="next">Next</button>
                        </fieldset>
                    </fieldset>

                    <fieldset class="step">
                        <label for="assunto" class="labelForm">What is the subject? *</label>
                        <input class="inputForm" type="text" name="assunto" id="assunto" placeholder="Question, Suggestion, Feedback">
                        <fieldset class="btngroup">
                            <button type="button" class="prev">Prev</button>
                            <button type="button" class="next">Next</button>
                        </fieldset>
                    </fieldset>

                    <fieldset class="step">
                        <label for="urgencia" class="labelForm">Is this message urgent? *</label>
                        <select class="inputForm" name="urgencia" id="urgencia">
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <fieldset class="btngroup">
                            <button type="button" class="prev">Prev</button>
                            <button type="button" class="next">Next</button>
                        </fieldset>
                    </fieldset>

                    <fieldset class="step">
                        <label for="mensagem" class="labelForm">Write a Message: *</label>
                        <textarea class="textAreaForm" maxlength="300" name="mensagem" id="mensagem" placeholder=""></textarea>
                        <br>
                        <!-- <input type="hidden" name="_next" value="http://localhost/siteJon/contact"> -->
                        <div class="btngroup">
                            <button type="button" class="prev">Prev</button>
                            <button class="btnsubmit" id="button" type="submit">
                                Send
                            </button>
                        </div>
                    </fieldset>
                </form>
                <div class="progress-bar">
                    <div class="progress"></div>    
                </div>
            </div>
        </section>
        <article class="socialMedia container">
                <h2>
                    <span class="faixaTitle">
                        Other ways to contact me
                    </span>
                </h2>
                <div class="contact_ways">
                    <div class="contact_container">
                        <i class="fa-solid fa-envelope"></i>
                        <p class="contact_text">
                            Email
                        </p>
                        <a href="mailto:jeovane.contact@gmail.com" aria-label="Send me an email">
                            jeovane.contact@gmail.com
                        </a>
                    </div>
                    <div class="contact_container">
                        <i class="fa-brands fa-telegram"></i>
                        <p class="contact_text">
                            Telegram:
                        </p>
                        <a href="https://t.me/joncrow64" title="My Telegram" target="_blank" rel="noopener noreferrer" aria-label="My Telegram @joncrow64">
                            @joncrow64
                        </a>
                    </div>
                    <div class="contact_container">
                        <i class="fa-brands fa-square-instagram"></i>
                        <p class="contact_text">
                            Instagram:
                        </p>
                        <a href="https://www.instagram.com/joncroww/" title="My Instagram" target="_blank" rel="noopener noreferrer">
                            @joncroww
                        </a>
                    </div>
                    <div class="contact_container">
                        <i class="fa-brands fa-x-twitter"></i>
                        <p class="contact_text">
                            Twitter/X:
                        </p>
                        <a href="https://x.com/joncrow_devlog" title="My Twitter/ X Page" target="_blank" rel="noopener noreferrer">
                            @joncrow_devlog
                        </a>
                    </div>
                    <div class="contact_container">
                        <i class="fa-brands fa-youtube"></i>
                        <p class="contact_text">
                            Youtube:
                        </p>
                        <a href="https://www.youtube.com/@joncrow?sub_confirmation=1" title="My Youtube Channel" target="_blank" rel="noopener noreferrer">
                            @joncrow
                        </a>
                    </div>
                </div>
        </article>