import { Observable, Subscriber } from 'rxjs';

export class FileUtils {

  public toBase64(file: File) {
    return new Observable<any>((subs: Subscriber<any>) => {
      this.readFile(subs, file);
    })
  }

  readFile(subscriber: Subscriber<any>, file: File) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

}
