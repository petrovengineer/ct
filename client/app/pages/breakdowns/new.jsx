import React from 'react'
import Modal from '../../components/modal'

const NewBreakdown = ({close})=>{
    return (
        <Modal close={close}>
            <div className="box">
                <a
                href="https://www.dropbox.com/s/u0bdwmkjmqld9l2/dbx-supporting-distributed-work.gif?dl=0"
                class="dropbox-embed"
                data-height="300px"
                data-width="600px"
                ></a>
                <div class="field">
                    <label class="label">Описание неисправности</label>
                    <div class="control">
                        <input class="input" type="text" />
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link">Создать</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default NewBreakdown