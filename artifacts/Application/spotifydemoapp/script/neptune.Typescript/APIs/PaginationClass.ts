class PaginationService {
  private _token: string = "Bearer BQCnlMKlD65PFivoU0VXsjrnai8JcvXaivFoMKF12NC9K6G8-Zb1v5sFRShJmNPMSM2Zj9OR4cZwyBvfjpsYQMqd1eXCMiDN2i6HAiAob-8AmqCw2cf8EAGKpvzvk9CiMUcsvtEqUQw";
  private static _instance: PaginationService;
  private _currentPage: number = 0;
  private _offSet: number = 0;
  private _totalItems: number = 0;

  private constructor() {}

  public static get instance(): PaginationService {
    if (!this._instance) {
      this._instance = new PaginationService();
    }
    return this._instance;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get offSet(): number {
    return this._offSet;
  }

  set offSet(offset: number) {
    this._offSet = offset;
  }

  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(totalItems: number) {
    this._totalItems = totalItems;
  }


  public nextPage(): void {
    if(this.hasNextPage()){
        this._currentPage++;
        this._offSet += 10; // If limit is 10...
    }
  }

  public previousPage(): void {
    if (this.hasPreviousPage()) {
      this._currentPage--;
      this._offSet = Math.max(0, this._offSet - 10);
    }
  }

  public hasNextPage(): boolean {
    return this._offSet + 10 < this._totalItems;
  }

  public hasPreviousPage(): boolean {
    return this._currentPage > 0;
  }

SearchApiRequest(search: string){
    var options = {
    headers: {
        Authorization: this._token,
        credentials: "omit",
    },
    parameters: {
        q: search,
        limit: "10",
        offset: this._offSet.toString(),
        type: "artist",
        market: "PT",
    },
    };

    apiSpotifySearch(options).then((result) => {
    try{
        console.log("Here is the result:::")
        this._totalItems = result.artists.total;
        console.log(result.artists.total)

        HBox3.setVisible(true);
    }catch{

    }
    });
}
}








//PaginationService.instance.searchApiRequest("eminem");
