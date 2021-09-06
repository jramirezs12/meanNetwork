import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-post',
  templateUrl: './save-post.component.html',
  styleUrls: ['./save-post.component.css'],
})
export class SavePostComponent implements OnInit {
  registerData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  selectedFile: any;

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
    this.selectedFile = null;
  }

  ngOnInit(): void {}

  savePost() {
    if (!this.registerData.textPost) {
      console.log('Failed process: Imcomplete data');
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._postService.savePost(this.registerData).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/listPost']);
          this.message = 'Post create';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  savePostImg() {
    if (!this.registerData.textPost) {
      console.log('Failed process: Imcomplete data');
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      const data = new FormData();
      data.append('image', this.selectedFile, this.selectedFile.name)
      data.append('Text post', this.registerData.textPost)

      this._postService.savePostImg(data).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['/listPost']);
          this.message = 'Post create';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
