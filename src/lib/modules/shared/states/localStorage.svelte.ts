class LocalStorage {
  constructor(public key: string) {

  }

  save(value: string) {
    localStorage.setItem(this.key, value)
  }
}

class LocalStorageString extends LocalStorage {
  value: string = $state('')
  constructor(key: string) {
    super(key)
    this.value = localStorage.getItem(key) ?? '';
  }

  setValue(value: string) {
    this.save(this.value)
  }
}

export class LocalStorageArray<T> extends LocalStorage {
  value: T[] = $state([])
  constructor(key: string) {
    super(key)
    try {
      for (const e of JSON.parse(localStorage.getItem(key) ?? '[]')) {
        this.value.push(e);
      }
    } catch (error) {

    }
  }
}


class Tab {
  constructor(
    public id: string,
    public title: string
  ) {}

  static createNew() {
    return new Tab(crypto.randomUUID(), 'Untitled')
  }
}

export class TabsState {
  key: string = 'toolkit.tabs';
  value: Tab[] = $state([])
  constructor() {
    let jsonTabs = localStorage.getItem(this.key);


    if (jsonTabs) {
      try {
        for (const e of JSON.parse(jsonTabs) as Tab[]) {
          this.value.push(new Tab(e.id, e.title));
        }
      } catch (error) {

      }
    }

    this.value.length === 0 && this.value.push(Tab.createNew())
  }

  addNewTab() {
    this.value.push(Tab.createNew())
    this.saveToLocalStorage()
  }

  removeTab(id: string) {
    this.value = this.value.filter(t => t.id != id)
  }

  saveToLocalStorage() {
    localStorage.setItem(this.key, JSON.stringify(this.value))
  }
}
