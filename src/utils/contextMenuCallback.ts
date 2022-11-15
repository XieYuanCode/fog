class ContextMenuCallbackEventTarget extends EventTarget { }

class ContextMenuCallbackEventListener {
  private _eventListener = new ContextMenuCallbackEventTarget()

  public initEvents() {
    common_bridge.onContextMenuClicked((_: Event, commandID: string) => this.onContextMenuClicked(commandID))
  }

  private onContextMenuClicked(commandID: string) {
    const [commandType, id] = commandID.split("_")

    const event = new CustomEvent(commandType, {
      detail: commandID
    })
    this._eventListener.dispatchEvent(event)
  }


  public addEventListener(commandType: string, cb: EventListenerOrEventListenerObject | null) {
    this._eventListener.addEventListener(commandType, cb)
  }

  public removeEventListener(commandType: string, cb: EventListenerOrEventListenerObject | null) {
    this._eventListener.removeEventListener(commandType, cb)
  }
}

const contextMenuCallbackEventListener = new ContextMenuCallbackEventListener()

export default contextMenuCallbackEventListener