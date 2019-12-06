import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BookService {

  private booksJSON: any[] = [];
  private reviewsJSON: any[] = [];
  private requestsJSON: any[] = [];
  private returnsJSON: any[] = [];
  // private loansJSON: any[] = [];
  public theBook = null;

  constructor() {
    var titles = [
      "Ulysses",
      "Lolita",
      "Catch-22",
      "Beloved",
      "Invisible Man",
      "Jane Eyre",
      "On the Road",
      "Middlemarch",
      "Mrs Dalloway",
      "Moby-Dick",
      "Native Son",
      "The Stranger",
      "The Hobbit",
      "Emma",
      "The Trial",
      "Tom Jones",
      "Song of Solomon",
      "Charlotte's Web",
      "Birdsong",
      "Frankenstein",
      "Dune",
      "Under the Volcano",
      "Disgrace",
      "Howards End",
      "Commedia",
      "White Noise",
      "Atonement",
      "Nostromo",
      "Herzog",
      "Scoop",
      "The Big Sleep",
      "A Suitable Boy",
      "JR",
      "Lucky Jim",
      "Underworld",
      "Life",
      "The Good Earth",
      "Ironweed",
      "Persuasion",
      "The Rainbow",
      "Kim",
      "Brighton Rock",
      "Housekeeping",
      "Ethan Frome",
      "Buddenbrooks",
      "Dubliners",
      "Gilead",
      "Nausea",
      "The Odyssey",
      "Life of Pi",
    ];

    var authors = [
      "James Joyce",
      "Vladimir Nabokov",
      "Joseph Heller",
      "Toni Morrison",
      "Ralph Ellison",
      "Charlotte Bronte",
      "Jack Kerouac",
      "George Eliot",
      "Virginia Woolf",
      "Herman Melville",
      "Richard Wright",
      "Albert Camus",
      "J.R.R Tolkein",
      "Jane Austen",
      "Franz Kafka",
      "Henry Fielding",
      "Toni Morrison",
      "E.B White",
      "Sebastian Faulks",
      "Mary Shelley",
      "Frank Herbert",
      "Malcom Lowry",
      "J.M Coetzee",
      "E.M Forster",
      "Dante Alighieri",
      "Don DeLillo",
      "Ian McEwan",
      "Joseph Conrad",
      "Saul Bellow",
      "Evelyn Waugh",
      "Raymond Chandler",
      "Vikram Seth",
      "William Gaddis",
      "Kingsley Amis",
      "Don DeLillo",
      "Georges Perec",
      "Pearl S. Buck",
      "William Kennedy",
      "Jane Austen",
      "D.H Lawrence",
      "Rudyard Kipling",
      "Graham Greene",
      "Marilynne Robinson",
      "Edith Wharton",
      "Thomas Mann",
      "James Joyce",
      "Marilynne Robinson",
      "Jean-Paul Sartre",
      "Homer",
      "Yann Martel",
    ];

    var ISBNs = [
      "978-1-97806-446-1",
      "B000NRQMD4",
      "0-671-12805-1",
      "1-58060-120-0",
      "978-0-679-60139-5",
      "978-1-40714-406-1",
      "978-0-14118-267-4",
      "978-1-97806-411-9",
      "0-15-662870-8",
      "978-1-85326-008-7",
      "978-0-09928-293-8",
      "978-1-97818-828-0",
      "978-0-00745-842-4",
      "978-1-85326-028-5",
      "978-0-24119-779-0",
      "978-0-14043-622-8",
      "0-394-49784-8",
      "978-0-062-65875-3",
      "0-09-177373-3",
      "978-1-84749-350-7",
      "978-0-34096-019-6",
      "978-0-14118-225-4",
      "0-436-20489-4",
      "978-0-14119-940-5",
      "978-1-52092-882-1",
      "0-670-80373-1",
      "0-224-06252-2",
      "978-1-85326-174-9",
      "978-014237292",
      "978-0-14118-402-9",
      "978-0-24195-628-1",
      "0-06-017012-3",
      "0-39-449550-0",
      "0-14-018630-1",
      "0-684-84269-6",
      "978-0-87923-751-6",
      "978-1-41651-110-6",
      "0-670-40176-5",
      "978-1-70276-638-8",
      "978-0-14144-138-2",
      "978-1-70105-636-7",
      "0787994707",
      "0-374-17313-3",
      "0-486-26690-7",
      "978-0-74938-647-4",
      "978-0-14062-221-7",
      "0-374-15389-2",
      "0-8112-0188-0",
      "978-0-14044-911-2",
      "0-676-97376-0",
    ];

    var publicationYears = [
      "2018",
      "1955",
      "1961",
      "1987",
      "1952",
      "2014",
      "2000",
      "2018",
      "1925",
      "1992",
      "2000",
      "2017",
      "2013",
      "1992",
      "2015",
      "2005",
      "1977",
      "1952",
      "1993",
      "2014",
      "2015",
      "2000",
      "1999",
      "2012",
      "2017",
      "1985",
      "2001",
      "1996",
      "1964",
      "2000",
      "2011",
      "1993",
      "1975",
      "1954",
      "1997",
      "1978",
      "2005",
      "1983",
      "2019",
      "2007",
      "2019",
      "1938",
      "1980",
      "1911",
      "1996",
      "1914",
      "2004",
      "1938",
      "2003",
      "2011",
    ];

    var images = [
      "https://almabooks.com/wp-content/uploads/2016/10/ulysses-evergreen-james-joyce-1.jpg",
      "https://cloud10.todocoleccion.online/libros-segunda-mano-literatura/tc/2018/11/14/07/140059770.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/717uObPTi8L.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41dRgue7zZL._SX325_BO1,204,203,200_.jpg",
      "https://pictures.abebooks.com/isbn/9780394717159-uk.jpg",
      "https://wordery.com/jackets/741255c3/jane-eyre-the-graphic-novel-charlotte-charlotte-bronte-9781907127410.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/8159dqtw25L.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/419wfMzqZML._SX324_BO1,204,203,200_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41vOENl2TeL._SX318_BO1,204,203,200_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81vjde0JFHL.jpg",
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1183388729l/1410525.jpg",
      "https://i.pinimg.com/originals/88/57/2a/88572ac678272b9195c22b5cb0b3e25a.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51FCE5VMsWL._SX324_BO1,204,203,200_.jpg",
      "https://img.wook.pt/images/emma-jane-austen/MXwxODQ5ODIyOHwxNDE5MzI2N3wxNDcwMTc4ODAwMDAw/500x",
      "https://cdn11.bigcommerce.com/s-5sppbk3px9/images/stencil/original/products/7908/73694/TheTrial_1__12949.1565198944.JPG?c=2",
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625581426/the-history-of-tom-jones-9781625581426_hr.jpg",
      "https://longlivetobe.files.wordpress.com/2019/07/al.030618.solomon.jpg?w=660",
      "https://www.scholastic.com/content5/media/products/15/9780590302715_mres.jpg",
      "https://kbimages1-a.akamaihd.net/a8bcfd98-7288-406d-8c17-1f50ee5cb158/353/569/90/False/birdsong-9.jpg",
      "https://cdn.shopify.com/s/files/1/0713/3909/products/frankenstein_1024x1024.jpg?v=1521984125",
      "https://images-na.ssl-images-amazon.com/images/I/51hREDrH8bL._SX321_BO1,204,203,200_.jpg",
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2cbf8b4-918b-49cd-843b-ee63adec23f9/d9zh1x6-fab8f3df-0d54-4917-8c07-99d4981bef21.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyY2JmOGI0LTkxOGItNDljZC04NDNiLWVlNjNhZGVjMjNmOVwvZDl6aDF4Ni1mYWI4ZjNkZi0wZDU0LTQ5MTctOGMwNy05OWQ0OTgxYmVmMjEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-m9JblcpbAbMmw6GWz6TuFDeA4K4OKPHJ9aK_x5GR40",
      "https://images-na.ssl-images-amazon.com/images/I/71zZ%2BAH9EdL.jpg",
      "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781627938006/howards-end-9781627938006_hr.jpg",
      "https://kbimages1-a.akamaihd.net/af9830cb-34c7-4f58-b855-9610055d437d/1200/1200/False/la-divina-commedia-di-dante-4.jpg",
      "https://images.penguinrandomhouse.com/cover/9780143105985",
      "https://images-na.ssl-images-amazon.com/images/I/91Dw8HP4mPL.jpg",
      "https://www.bleakhousebooks.com.hk/pictures/medium/2463.jpg",
      "https://vinylfiction.com/wp-content/uploads/2017/08/Herzog.jpg",
      "https://fellfromfiction.files.wordpress.com/2015/03/scoop.jpeg",
      "https://fellfromfiction.files.wordpress.com/2015/03/scoop.jpeg",
      "https://pmcdeadline2.files.wordpress.com/2017/05/a-suitable-boy-vikram-seth.jpg",
      "https://i2.wp.com/literariness.org/wp-content/uploads/2018/06/51gxsvh7mcl-_sx290_bo1204203200_.jpg?fit=292%2C474&ssl=1",
      "https://1.bp.blogspot.com/-WOEaCONhhHE/UUheM2DcnoI/AAAAAAAAKUo/fj9Ryj4WQ1g/s1600/Amis_Lucky_Jim.jpg",
      "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9781416548645_9781416548645_hr.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51p7nPuNfML.jpg",
      "https://pictures.abebooks.com/TAUBERMAX/16321605847.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81e99NonzlL.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91ppoWgSGlL.jpg",
      "https://bytethebook.com/wp-content/uploads/2015/01/Rainbow.jpg",
      "https://www.borgantiquarian.com/pictures/2135.JPG?v=1505952347",
      "https://www.bleakhousebooks.com.hk/pictures/medium/9897.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/811lAuEq2cL.jpg",
      "https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743487702_9780743487702_hr.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91GDow1tuLL.jpg",
      "https://kbimages1-a.akamaihd.net/8c65e9d7-2378-47d3-8c33-5e0b62d43677/1200/1200/False/dubliners-76.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91k3cIBsWSL.jpg",
      "https://kbimages1-a.akamaihd.net/d3361e13-933c-44f6-aa40-8b849398d582/353/569/90/False/nausea-by-jean-paul-sartre-book-analysis.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51FR8mSgqoL._SX346_BO1,204,203,200_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81E9oNSK3bL.jpg",
    ];

    var status = [
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
      "available",
      "not-available",
      "not-available",
      "available",
      "available",
    ];

    for (var i = 0; i < authors.length; i++) {
      var aBook = {
        "title":"",
        "author":"",
        "isbn":"",
        "year":"",
        "image":"",
        "status":"",
      }

      aBook.title = titles[i];
      aBook.author = authors[i];
      aBook.isbn = ISBNs[i];
      aBook.year = publicationYears[i];
      aBook.image = images[i];
      aBook.status = status[i];

      this.booksJSON.push(aBook);
    }

    if (!localStorage.getItem("reviews")) {
      localStorage.setItem("reviews", JSON.stringify([]));
    }

    localStorage.setItem("reviews", JSON.stringify(this.reviewsJSON));

    const reviewsStorage = JSON.parse(localStorage.getItem("reviews")) as any[];

    // reviewsStorage.forEach(review => {
    //   this.reviewsJSON.push(Object.assign(review));
    // });
  }

  public getBooks() {
    return this.booksJSON;
  }

  public getReviews() {
    return this.reviewsJSON;
  }

  public getRequests() {
    return this.requestsJSON;
  }

  public getReturns() {
    return this.returnsJSON;
  }

  public addReview(reviewObj):boolean {
    this.reviewsJSON.push(reviewObj);
    localStorage.setItem("reviews", JSON.stringify(this.reviewsJSON));
    return true;
  }

  public addRequest(requestObj):boolean {
    this.requestsJSON.push(requestObj);
    localStorage.setItem("requests", JSON.stringify(this.requestsJSON));
    return true;
  }

  public addReturn(returnObj):boolean {
    this.returnsJSON.push(returnObj);
    localStorage.setItem("returns", JSON.stringify(this.returnsJSON));
    return true;
  }

  public doCancelUserRequest(isbn, userEmail):boolean {
    for (var t = 0; t < this.requestsJSON.length; t++) {
      if (this.requestsJSON[t].email == userEmail && this.requestsJSON[t].isbn == isbn) {
        this.requestsJSON.splice(t, 1);
        return true;
      }
    }
    return false;
  }

  public doCancelUserReturn(isbn, userEmail):boolean {
    for (var t = 0; t < this.returnsJSON.length; t++) {
      if (this.returnsJSON[t].email == userEmail && this.returnsJSON[t].isbn == isbn) {
        this.returnsJSON.splice(t, 1);
        return true;
      }
    }
    return false;
  }

  public denyRequest(requestObj):boolean {
    for (var t = 0; t < this.requestsJSON.length; t++) {
      if (this.requestsJSON[t].email == requestObj.email && this.requestsJSON[t].isbn == requestObj.isbn) {
        this.requestsJSON.splice(t, 1);
        return true;
      }
    }
    return false;
  }

  public denyReturnRequest(returnObj):boolean {
    for (var t = 0; t < this.returnsJSON.length; t++) {
      if (this.returnsJSON[t].email == returnObj.email && this.returnsJSON[t].isbn == returnObj.isbn) {
        this.returnsJSON.splice(t, 1);
        return true;
      }
    }
    return false;
  }

  public replaceReview(reviewObj):boolean{
    for (var i = 0; i < this.reviewsJSON.length; i++) {
      if (this.reviewsJSON[i].isbn == reviewObj.isbn && this.reviewsJSON[i].reviewee == reviewObj.reviewee) {
        this.reviewsJSON[i] = null;
        this.reviewsJSON[i] = reviewObj;
        localStorage.setItem("reviews", JSON.stringify([]));
        localStorage.setItem("reviews", JSON.stringify(this.reviewsJSON));
        return true;
      }
    }
    return false;
  }

  getBookDetails(isbn) {
    for (var i = 0; i < this.booksJSON.length; i++) {
      if (this.booksJSON[i].isbn == isbn) {
        return this.booksJSON[i];
      }
    }
  }

  doAddBook(aBook):boolean {
    this.booksJSON.push(aBook);
    return true;
  }

  doDeleteBook(isbn):boolean {
    for (var i = 0; i < this.booksJSON.length; i++) {
      if (this.booksJSON[i].isbn == isbn) {
        this.booksJSON.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public doUpdateBook(isbn, newData):boolean {
    for (var i = 0; i < this.booksJSON.length; i++) {
      if (this.booksJSON[i].isbn == isbn) {
        var newDataKeys = Object.keys(newData);
        var newDataValues = [];

        for(var item in newData) {
          newDataValues.push(newData[item]);
        }

        for (var j = 0; j < newDataKeys.length; j++) {
          var stringEq = newDataKeys[j];
          this.booksJSON[i][stringEq] = newDataValues[j];
        }
        // localStorage.setItem("users", JSON.stringify(this.usersJSON));
        return true;
      }
    }
    return false;
  }

  public doGetAvailableBooks() {
    var numberOfAvailable = 0;
    for (var i = 0; i < this.booksJSON.length; i++) {
      if (this.booksJSON[i].status == "available") {
        numberOfAvailable = numberOfAvailable + 1;
      }
    }
    return numberOfAvailable;
  }

  public doGetUserPendingLoan(email) {
    var iterator = 0;
    for (var i = 0; i < this.requestsJSON.length; i++) {
      if (this.requestsJSON[i].email == email) {
        iterator = iterator + 1;
      }
    }
    return iterator;
  }

  public doGetUserPendingReturn(email) {
    var iterator = 0;
    for (var i = 0; i < this.returnsJSON.length; i++) {
      if (this.returnsJSON[i].email == email) {
        iterator = iterator + 1;
      }
    }
    return iterator;
  }

  public doSearchBooksLibrarian(searchText) {
    var arrayOfReturns = [];

    for (var i = 0; i < this.booksJSON.length; i++) {
      if (this.booksJSON[i].status == searchText) {
        arrayOfReturns.push(this.booksJSON[i]);
      }
    }
    return arrayOfReturns;
  }

  doSearchBooks(searchObj) {
    var keys = Object.keys(searchObj);
    var newDataValues = [];
    var matchFound:boolean = false;
    var containsTitle;
    var containsISBN;
    var containsAuthor;
    var containsPublication;

    var titleMatch = [];
    var ISBNMatch = [];
    var authorMatch = [];
    var publicationMatch = [];

    for(var item in searchObj) {
      newDataValues.push(searchObj[item]);
    }

    containsTitle = searchObj.hasOwnProperty("title");
    containsISBN = searchObj.hasOwnProperty("isbn");
    containsAuthor = searchObj.hasOwnProperty("author");
    containsPublication = searchObj.hasOwnProperty("publication");
    
    //iterate through all books
    for (var i = 0; i < this.booksJSON.length; i++) {
      matchFound = false;
      
      //iterate through all elements of search obj
      for (var j = 0; j < keys.length; j++) {
        
        if (keys[j]=="title") {
          if (this.booksJSON[i].title.includes(newDataValues[j])) {
            titleMatch.push(this.booksJSON[i]);
            matchFound = true;
          }
        } else if (keys[j]=="isbn") {
          if (this.booksJSON[i].isbn == newDataValues[j]) {
            ISBNMatch.push(this.booksJSON[i]);
            matchFound = true;
          }
        } else if (keys[j]=="author") {
          if (this.booksJSON[i].author.includes(newDataValues[j])) {
            authorMatch.push(this.booksJSON[i]);
            matchFound = true;
          }
        } else if (keys[j]=="publication") {
          if (this.booksJSON[i].year == newDataValues[j]) {
            publicationMatch.push(this.booksJSON[i]);
            matchFound = true;
          }
        }
      }
    }
      // if (matchFound) {
      if (titleMatch.length > 0 || authorMatch.length > 0 || ISBNMatch.length > 0 || publicationMatch.length > 0) {

        if (containsTitle && titleMatch.length > 0) {
          var arrayOfReturns = [];

          for (var o = 0; o < titleMatch.length; o++) {

            if (containsISBN) {
              for (var r = 0; r < ISBNMatch.length; r++) {
                if (ISBNMatch[r] == titleMatch[o]) {
                  arrayOfReturns.push(ISBNMatch[r]);
                } else {}
              }
            }
            if (containsAuthor) {
              for (var r = 0; r < authorMatch.length; r++) {
                if (authorMatch[r] == titleMatch[o]) {
                  arrayOfReturns.push(authorMatch[r]);
                } else {}
              }
            }
            if (containsPublication) {
              if (publicationMatch.length > 0) {
                for (var r = 0; r < publicationMatch.length; r++) {
                  if (publicationMatch[r] == titleMatch[o]) {
                    arrayOfReturns.push(publicationMatch[r]);
                  } else {}
                }
              } else {
                titleMatch = [];
              }
            }
            if (!containsISBN && !containsAuthor && !containsPublication) {
              arrayOfReturns.push(titleMatch[o]);
            }

          }
          arrayOfReturns = Array.from(new Set(arrayOfReturns));
          return arrayOfReturns;
        }

        if (containsISBN && ISBNMatch.length > 0) {
          var arrayOfReturns = [];

          for (var o = 0; o < ISBNMatch.length; o++) {

            if (containsTitle) {
              for (var r = 0; r < titleMatch.length; r++) {
                if (titleMatch[r] == ISBNMatch[o]) {
                  arrayOfReturns.push(titleMatch[r]);
                } else {}
              }
            }
            if (containsAuthor) {
              for (var r = 0; r < authorMatch.length; r++) {
                if (authorMatch[r] == ISBNMatch[o]) {
                  arrayOfReturns.push(authorMatch[r]);
                } else {}
              }
            }
            if (containsPublication) {
              if (publicationMatch.length > 0) {
                for (var r = 0; r < publicationMatch.length; r++) {
                  if (publicationMatch[r] == ISBNMatch[o]) {
                    arrayOfReturns.push(publicationMatch[r]);
                  } else {}
                }
              } else {
                ISBNMatch = [];
              }
            }
            if (!containsTitle && !containsAuthor && !containsPublication) {
              arrayOfReturns.push(ISBNMatch[o]);
            }
          }
          arrayOfReturns = Array.from(new Set(arrayOfReturns));
          return arrayOfReturns;
        }

        if (containsAuthor && authorMatch.length > 0) {
          var arrayOfReturns = [];

          for (var o = 0; o < authorMatch.length; o++) {

            if (containsTitle) {
              for (var r = 0; r < titleMatch.length; r++) {
                if (titleMatch[r] == authorMatch[o]) {
                  arrayOfReturns.push(titleMatch[r]);
                } else {}
              }
            }
            if (containsISBN) {
              for (var r = 0; r < ISBNMatch.length; r++) {
                if (ISBNMatch[r] == authorMatch[o]) {
                  arrayOfReturns.push(ISBNMatch[r]);
                } else {}
              }
            }
            if (containsPublication) {
              if (publicationMatch.length > 0) {
                for (var r = 0; r < publicationMatch.length; r++) {
                  if (publicationMatch[r] == authorMatch[o]) {
                    arrayOfReturns.push(publicationMatch[r]);
                  } else {}
                }
              } else {
                authorMatch = [];
              }
            }
            if (!containsTitle && !containsISBN && !containsPublication) {
              arrayOfReturns.push(authorMatch[o]);
            }
          }
          arrayOfReturns = Array.from(new Set(arrayOfReturns));
          return arrayOfReturns;
        }

        if (containsPublication && publicationMatch.length > 0) {
          var arrayOfReturns = [];

          for (var o = 0; o < publicationMatch.length; o++) {

            if (containsTitle) {
              for (var r = 0; r < titleMatch.length; r++) {
                if (titleMatch[r] == publicationMatch[o]) {
                  arrayOfReturns.push(titleMatch[r]);
                } else {}
              }
            }
            if (containsISBN) {
              for (var r = 0; r < ISBNMatch.length; r++) {
                if (ISBNMatch[r] == publicationMatch[o]) {
                  arrayOfReturns.push(ISBNMatch[r]);
                } else {}
              }
            }
            if (!containsTitle && !containsISBN && !containsAuthor) {
              arrayOfReturns.push(publicationMatch[o]);
            }
          }
          arrayOfReturns = Array.from(new Set(arrayOfReturns));
          return arrayOfReturns;
        }
        return null;
      }
  }
}