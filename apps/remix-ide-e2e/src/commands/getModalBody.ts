import { NightwatchBrowser } from "nightwatch"
import EventEmitter from "events"

class GetModalBody extends EventEmitter {
  command (this: NightwatchBrowser, callback: CallableFunction) {
    this.api.waitForElementVisible('.modal-body')
    .getText('.modal-body', (result) => {
      console.log(result)
      callback(result.value, () => {
        this.emit('complete')
      })
    })
    return this
  }
}

module.exports = GetModalBody