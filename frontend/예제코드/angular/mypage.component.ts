import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../shared/user/user.service";
import { userAttributes, SettingAttributes, UserData } from "../shared/user/user-models/user";
import { DevConfig } from "../../assets/config/properties";
import { MypageDatatableComponent } from "./datatables/mypage-datatable.component";
import { AlertService } from "../shared/alert/alert.service";
import { ChatService } from '../shared/chat/chat.service';
import * as moment from 'moment';
import { sha256 } from '../shared/utils/sha256';
import { ClipboardService } from 'ng2-clipboard/ng2-clipboard';
declare var $: any;

@Component({
  selector: 'sa-mypage',
  templateUrl: 'mypage.component.html',
  styleUrls: ['../../assets/css/user-style.css'],
})
export class MypageComponent implements OnInit, AfterViewInit {
  
  noUiSliderValue = [264, 776];
  private shortcutValidationForm: FormGroup;
  private isShortcutOverlap: boolean = false;
  private isShortcutButton: boolean = false;

  private model : userAttributes;
  private imageSrc: string;
  private filesize: string;
  private filename: string;
  private filetype: string;
  createDate: string;

  private token: string;
  private role: string;
  private company: string;

  private skills: Array<{code: string, name: string}>;
  private teams: Array<{code: string, name: string}>;
  
  private password: string;
  private changePassword: string;
  private changePasswordConfirm: string;

  private shortcutname: string;
  private shortcutmessage: string;

  private escape:boolean;
  private changeImg:boolean;

  private shortBtnTitle:string = '단축버튼 생성';
  private changeBeforeTitle:string = '';

  private shortCutFlag:boolean = false;

  shortcuts: Array<{code: string, name: string}>;
  shotcutPreviews:  Array<{code: string}>;

  validatorOptions = {
    feedbackIcons: {      
    },
    fields: {      
      phone: {
        validators: {
          notEmpty: {
            message: '전화번호를 입력하세요.'
          },
          regexp: {
            regexp: "^01([0|1|6|7|8|9])-(?:\\d{3}|\\d{4})-\\d{4}$",
            message: '올바른 형식이 아닙니다.'
          }
        }
      },
      nickname: {
        validators: {
          notEmpty: {
            message: '표시이름을 입력하세요.'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: '이메일을 입력하세요.'
          }
        }
      },
      maxChat: {
        validators: {
          notEmpty: {
            message: '최대 상담채팅 수를 입력하세요.'
          }
        }
      }      
    }
  };

  constructor( private userService: UserService,
               private route: ActivatedRoute,
               private router: Router,
               private http: Http,
               private fb: FormBuilder,
               private chatService: ChatService,
               private alertService: AlertService,
               private clipboardService: ClipboardService) {

    // console.log('Mypage Form이 정상적으로 로딩되었습니다.');    
    this.token =  this.userService.ConnectedUser.accessToken;
    this.role = this.userService.ConnectedUser.userInfo.role;
    this.company = this.userService.ConnectedUser.userInfo.company;

    this.shortcutValidationForm = this.fb.group({
        'shortcutname': ['', [Validators.required, Validators.minLength(1)]],
        'shortcutmessage': ['', [Validators.required, Validators.minLength(1)]],
    });    
  }

  ngOnInit() {
    this.model = this.userService.ConnectedUser.userInfo;
    this.createDate = moment(this.model.createdAt).format('YYYY-MM-DD');
    this.imageSrc = this.userService.ConnectedUser.userImage;
    this.password = "";
    this.changePassword = "";
    this.changePasswordConfirm = "";
    this.shortcutname = "";
    this.shortcutmessage = "";
    this.escape = false;
    this.changeImg = false;

    this.skills = this.userService.ConnectedUser.skills.toString() != 'null' ? this.userService.ConnectedUser.skills : new Array() ;
    this.teams = this.userService.ConnectedUser.teams.toString() != 'null' ? this.userService.ConnectedUser.teams : new Array() ;

  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.onSearch();
   
    }, 1000);    
  }

  //단축버튼(shorcut)조회
  onSearch() {

    var datatable =  $("#tableMypageList").dataTable().api();
    datatable.clear();

    if( this.model.shortcut == null || this.model.shortcut.length == 0 ){
        datatable.draw();
        return false;
    }

    // $.each(JSON.parse(this.model.shortcut), function(k, val){
    //   Object.keys(val).map(key => key );
    //   Object.keys(val).map(key => val[key]);
    // });
   
    $("input:checkbox[name='select_all']").prop("checked", false);

    let jasonArrayData = [];

    $.each(JSON.parse(this.model.shortcut), function(k, val){      
        let jsonData = {
          id:Object.keys(val).map(key => key ),
          num:k+1,
          key:Object.keys(val).map(key => key ),
          val:Object.keys(val).map(key => val[key])
        }
        jasonArrayData.push(jsonData);
    });
    datatable.rows.add(jasonArrayData);
    datatable.draw();

    $('#tableMypageList').delegate('tr', 'click', (event) => {
        //this.isError = false;
        //this.errorMessage = '';
        this.shortBtnTitle = '단축버튼 수정'; 
        
        // 데이터 갯수를 카운트 하여 선택한 row에 데이터가 없으면 이벤트가 동작하지 않게 한다.      
        let $row = $(event.target).closest('tr');  
        let data =  $("#tableMypageList").dataTable().api().row($row).data();
                    
        if (data != undefined) {
            this.changeBeforeTitle = data.key;            
            this.shortcutname = ""+data.key+"";
            this.shortcutmessage = ""+data.val+"";
            $(".scmodal").modal("show");
        } 
    });

  }

  onFileChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {

      if( !(/image/i).test( fileInput.target.files[0].type ) ) {
        alert("이미지 파일을 선택해 주세요!");
        return false;
      }

      let file = fileInput.target.files[0];
      this.filesize = file.size;
      this.filename = file.name.replace(/\s/gi, '');
      this.filetype = file.type;

      let reader = new FileReader();
      reader.onload = (e: Event) => {
        this.onLoadCallback(e, file);
      }

      reader.readAsDataURL(file);      
    }
  }

  onLoadCallback(e, file:any) {
    this.changeImg = true;
    this.imageSrc = e.target.result;    
    // this.userService.setUserImage(e.target.result, file.name.replace(/\s/gi, ''), file.size, file.type );
  }

  onClickFileRemove() {
    this.changeImg = true;
    this.imageSrc = "";
  }

  onChangeUserInfo(update:any, imgSrc?:string) {
    let headers = new Headers({ 'Content-type' : 'application/json' });
    let options = new RequestOptions({ headers });
      
    let data = {
      "accessToken": this.token,
      "company": this.model.company, 
      "userid": this.model.userid,
      "update": update
    };

    let URL = DevConfig.protocol+"://"+ DevConfig.ip + ":" + DevConfig.port + DevConfig.user_update; 
    this.http.post(URL, data, options)
      .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
      .toPromise()
      .then( (res:Response) => {
        if(res.status == 200) {
          this.onUserInfoRefresh();
          if ( typeof update.password != 'undefined') { this.userService.saveConnectedUser(); }          
          if ( typeof imgSrc != 'undefined' && imgSrc === 'remove') { this.model.imageId = ''; this.userService.ConnectedUser.userImage = ''; } 

          this.chatService.CheckUserInfo()
              .then( (response) => {
                this.alertService.successMessage('마이페이지', '항목이 정상적으로 저장 되었습니다. 새로고침을 수행합니다.');  
                location.reload();
              })
              .catch( (errorcode) => {
                this.alertService.alramBox('마이페이지', '항목의 저장이 실패하였습니다.', '#C46A69', 'fa fa-warning shake animated');
              });

        }
      },
      (error) => {
        this.alertService.handleError(error);
      })
      .catch(((error) => {this.alertService.handleError(error)} ));
  }

  onSubmit() {    
    let validPassword: boolean = false;

    // 0. 상담중이면 메세지 출력후 동작 못하게 한다.
    if(this.chatService.checkActiveRooms() > 0) {
      this.alertService.handleError('상담중에는 마이페이지 저장을 할 수 없습니다.'); 
      return;
    }
    
    // 1. 변경할 Password가 존재할 경우 패스워드 validation 체크 루틴이 동작한다.
    if( this.changePassword != undefined && this.changePassword.length > 7) {      
      // 1. 입력한 현재 비밀번호가 맞는지 체크
      if (sha256(this.password) === this.model.password) {
        // 2. 입력한 두개의 변경할 비밀번호가 서로 맞는지 체크
        if (this.changePassword === this.changePasswordConfirm) {
          // 3. 기존 패스워드와 새로 변경할 패스워드가 서로 다른지 체크
          if (sha256(this.changePassword) != this.model.password ) {
            validPassword = true;
          } else this.alertService.handleError('기존 비밀번호와 새로 입력한 비밀번호가 같습니다. 다시 입력해 주세요'); 
        } else this.alertService.handleError('변경할 비밀번호가 서로 다릅니다. 다시 입력해 주세요');
      } else this.alertService.handleError('입력한 현재 비밀번호가 다릅니다. 다시 입력해 주세요'); 
    } else {
      // 변경할 패스워드가 존재하지 않을 경우
      this.updateUserInfo();
      return;
    }

    if (!validPassword) return 
    else {
      this.userService.checkPassword(this.userService.ConnectedUser.userInfo.userid, this.userService.ConnectedUser.userInfo.password)
        .subscribe ((response:Response) => {
          // checkPassword 성공
          // reason은 변경사유가 존재할경우 사용함.
          if (response) {
            let result = response.json();          
            if (result.canChange) {
              // 비밀번호가 변경가능하면 수행한다.
              this.updateUserInfo();
            } else {
              // 비밀번호 변경 불가능한 경우
              if ( result.hasOwnProperty('reason') ) {
                switch (result.reason) {
                  case 'today':
                    this.alertService.successMessage('비밀번호 변경', '하루에 변경 가능한 횟수를 초과하였습니다.');
                    //this.loginAfterSuccess(this.userService.ConnectedUser.userInfo.role);
                    break;
                  case 'last':
                    this.alertService.handleError('변경하고자 하는 비밀번호가 지난 3회 동안의 비밀번호와 같습니다.');
                    break;
                  default:
                    break;
                }
              }
            }
          }
        });
    }

  }

  private updateUserInfo() {
    let headers = new Headers({ 'Content-type' : 'application/json' });
    let options = new RequestOptions({ headers });      

    if( this.changePassword != undefined && this.changePassword.length > 7) {
      if ( this.password != undefined && sha256(this.password) === this.model.password ) {

        if ( this.changeImg) {

          if ( this.imageSrc != undefined && this.imageSrc.match(/base64/i) ) {
            let URL = DevConfig.protocol+"://" + DevConfig.ip + ":" + DevConfig.port + DevConfig.fileupload;

            let filedata = {"data" : this.imageSrc.split(",")[1], "filename": this.filename, "size": this.filesize, "type": this.filetype};

            this.http.post(URL, filedata, options)
              .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
              .toPromise()
              .then( (res:Response) => {
                this.model.imageId = JSON.parse(JSON.stringify(res.json())).id;
                this.userService.getUserImage(this.model.imageId)
                  .subscribe ((response:Response) => {                    
                    if (response.json().data == 'NULL') this.userService.ConnectedUser.userImage = '';
                    else this.userService.ConnectedUser.userImage = 'data:image/gif;base64,'+response.json().data;                    
                  },
                  (error) => {  this.alertService.handleError(error); });

                  let update = {
                    "userid": this.model.userid,
                    "nickname": $("#nickname").val(),
                    "phone": $("#phone").val(),
                    "email": $("#email").val(),
                    "password": sha256(this.changePassword),
                    "maxChat": $("#maxChat").val(),
                    "imageId": this.model.imageId
                  };

                  this.onChangeUserInfo(update);
              },
              (error) => { this.alertService.handleError(error); })
              .catch( (error) => { this.alertService.handleError(error); } );
          } else if ( this.imageSrc != undefined ) {
             let update = {
              "userid": this.model.userid,
              "nickname": $("#nickname").val(),
              "phone": $("#phone").val(),
              "email": $("#email").val(),
              "password": sha256(this.changePassword),
              "maxChat": $("#maxChat").val(),
              "imageId": ""
            };
            this.onChangeUserInfo(update, 'remove');
          }
        } else {

          let update = {
            "userid": this.model.userid,
            "nickname": $("#nickname").val(),
            "phone": $("#phone").val(),
            "email": $("#email").val(),
            "maxChat": $("#maxChat").val(),
            "password": sha256(this.changePassword)
          };
          this.onChangeUserInfo(update);
        }

      } else {        
        this.alertService.handleError("현재 비밀번호가 일치하지 않습니다.");
        this.changePasswordConfirm = "";
        return false;
      }
    } else {

      if(this.changeImg) {
        if ( this.imageSrc != undefined && this.imageSrc.match(/base64/i) ) {
        let URL = DevConfig.protocol+"://" + DevConfig.ip + ":" + DevConfig.port + DevConfig.fileupload;

        let filedata = {"data" : this.imageSrc.split(",")[1], "filename": this.filename, "size": this.filesize, "type": this.filetype};

        this.http.post(URL, filedata, options)
          .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
          .toPromise()
          .then( (res:Response) => {
            this.model.imageId = JSON.parse(JSON.stringify(res.json())).id;
            this.userService.getUserImage(this.model.imageId)
              .subscribe ((response:Response) => {                    
                if (response.json().data == 'NULL') this.userService.ConnectedUser.userImage = '';
                else this.userService.ConnectedUser.userImage = 'data:image/gif;base64,'+response.json().data;                    
              },
              (error) => {  this.alertService.handleError(error); });

               let update = {
                  "userid": this.model.userid,
                  "nickname": $("#nickname").val(),
                  "phone": $("#phone").val(),
                  "email": $("#email").val(),
                  "maxChat": $("#maxChat").val(),
                  "imageId": this.model.imageId
                };

                this.onChangeUserInfo(update);
          },
          (error) => { this.alertService.handleError(error); })
          .catch( (error) => { this.alertService.handleError(error); } );
        } else if ( this.imageSrc != undefined ) {
             let update = {
              "userid": this.model.userid,
              "nickname": $("#nickname").val(),
              "phone": $("#phone").val(),
              "email": $("#email").val(),
              "maxChat": $("#maxChat").val(),
              "imageId": ""
            };
            this.onChangeUserInfo(update, 'remove');
          }
      } else {
        let update = {
          "userid": this.model.userid,
          "nickname": $("#nickname").val(),
          "phone": $("#phone").val(),
          "maxChat": $("#maxChat").val(),
          "email": $("#email").val()
        };
        this.onChangeUserInfo(update);
      }
    }
    this.changeImg = false;
  }

  private onUserInfoRefresh() {
    this.model.nickname = $("#nickname").val();
    this.model.phone = $("#phone").val();
    this.model.email = $("#email").val();
    this.model.maxChat = $("#maxChat").val();
    this.model.password = sha256($("#changePassword").val());
    this.userService.getUserInfo(this.token, this.userService.ConnectedUser.userInfo.userid, this.userService.ConnectedUser.userInfo.company)
        .subscribe ( 
          (response: Response) => {

            return response
          },
          (error) => {
            this.alertService.handleError(error);
            console.log('에러 : 유저 정보 가져오기 ');     
          });
  }

  private onImageUpload() {
    let headers = new Headers({ 'Content-type' : 'application/json' });
    let options = new RequestOptions({ headers });

    if(this.imageSrc != undefined && this.imageSrc.match(/base64/i)) {
      let URL = DevConfig.protocol+"://" + DevConfig.ip + ":" + DevConfig.port + DevConfig.fileupload;

      let filedata = {"data" : this.imageSrc.split(",")[1], "filename": this.filename, "size": this.filesize, "type": this.filetype};

      this.http.post(URL, filedata, options)
        .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
        .toPromise()
        .then( (res:Response) => {
          this.model.imageId = JSON.parse(JSON.stringify(res.json())).id;
        },
        (error) => { this.alertService.handleError(error); })
        .catch( (error) => { this.alertService.handleError(error); } );
    }
  }

  onClickModify() {
    $.SmartMessageBox({
      title: '수정',
      content: "기본정보을 수정하시겠습니까? <br/>수정시 변경된 데이터를 셋팅하기 위하여 재로그인을 합니다. 상담중이시라면 [아니오]를 클릭하세요.",
      buttons: '[아니요][예]'
    }, (ButtonPressed) => {
      switch (ButtonPressed) {
        case "예":
          this.onSubmit();
          break;
        case "아니요":
          break;      
        default:
          break;
      }
    });
  }

  //단축버튼(shortcut) 삭제 유효성체크
  private onClickDelete() {
    // 0. 상담중이면 메세지 출력후 동작 못하게 한다.
    if(this.chatService.checkActiveRooms() > 0) {
      this.alertService.handleError('상담중에는 단축버튼 삭제를 할 수 없습니다.'); 
      return;
    }

    if( $('#tableMypageList tbody input[type="checkbox"]:checked').length  == 0 ) {     
      this.alertService.handleError('선택한 항목이 없습니다. <br/>항목을 선택 후 삭제하여 주십시오.'); 
      return;
    }

    $.SmartMessageBox({
      title: '삭제',
      content: "선택한 항목을 삭제합니다. 정말 삭제 하시겠습니까?",
      buttons: '[아니요][예]'
    }, (ButtonPressed) => {
      switch (ButtonPressed) {
        case "예":
          this.deleteSelectItem();
          break;
        case "아니요":
          break;      
        default:
          break;
      }
    });
  }

  //단축버튼(shortcut) 삭제
  deleteSelectItem() {

    if(this.shortCutFlag === true){    //전체용 단축버튼 삭제
        if(this.userService.ConnectedUser.userInfo.role !== "manager"){
            this.alertService.handleError('전체 단축버튼 삭제는 매니저만 삭제 가능합니다.'); 
            return;
        }
    }

    let items = [];
    let indexs = Array<number>();

    let arr = [];
    let obj = {};    

    if(this.shortCutFlag === false){    //개인용 단축버튼 삭제
        // NULL 체크 추가 
        if( this.model.shortcut == null || this.model.shortcut.length == 0 ){

        
        } else {
            $('#tableMypageList tbody input[type="checkbox"]:checked').each(function (e) {      
                var $row = $(this).closest('tr');
                var data =  $("#tableMypageList").dataTable().api().row($row).data();
                items.push( data.id);
            });

            $.each(JSON.parse(this.model.shortcut), function(index, val){
                let keyval = Object.keys(val).map(key => key );
                $.each( items, function(idx, value){          
                if( keyval.toString() == value ) { indexs.push(index); }                
                });            
            });
            arr = JSON.parse(this.model.shortcut);
            for(var i=indexs.length; 0<i; i--){
                arr.splice(indexs[i-1], 1);
            }
        }      

        let headers = new Headers({ 'Content-type' : 'application/json' });
        let options = new RequestOptions({ headers });

        let update = {
        "userid": this.model.userid,     
        "shortcut": arr
        };
        let data = {
        "accessToken": this.token,
        "company": this.model.company,
        "userid": this.model.userid,
        "update": update
        };
        let URL = DevConfig.protocol+"://"+ DevConfig.ip + ":" + DevConfig.port + DevConfig.user_update; 
        this.http.post(URL, JSON.stringify(data), options)
        .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
        .toPromise()
        .then( (res:Response) => {
            if(res.status == 200) {        
            this.alertService.successMessage('단축버튼', '단축버튼 항목이 정상적으로 삭제 되었습니다.');
            this.model.shortcut = JSON.stringify(arr);
            this.onSearch();
            }  
        },
        (error) => { this.alertService.handleError(error); })
        .catch( (error) => { this.alertService.handleError(error); } );

    }else{       //전체용 단축버튼 삭제

        // NULL 체크 추가 
        if( this.userService.ConnectedUser.settingInfo.shortCutGlobal === null || this.userService.ConnectedUser.settingInfo.shortCutGlobal === '' ){

        
        } else {
            $('#tableMypageList tbody input[type="checkbox"]:checked').each(function (e) {      
                var $row = $(this).closest('tr');
                var data =  $("#tableMypageList").dataTable().api().row($row).data();
                items.push( data.id);
            });

            $.each(JSON.parse(this.userService.ConnectedUser.settingInfo.shortCutGlobal), function(index, val){
                let keyval = Object.keys(val).map(key => key );
                $.each( items, function(idx, value){          
                if( keyval.toString() == value ) { indexs.push(index); }                
                });            
            });
            arr = JSON.parse(this.userService.ConnectedUser.settingInfo.shortCutGlobal);
            for(var i=indexs.length; 0<i; i--){
                arr.splice(indexs[i-1], 1);
            }
        }      

        let headers = new Headers({ 'Content-type' : 'application/json' });
        let options = new RequestOptions({ headers });

        let update = {
            "shortCutGlobal": arr
        }

        let body = {
            accessToken: this.userService.ConnectedUser.accessToken,
            company: this.userService.ConnectedUser.userInfo.company,
            userid: this.userService.ConnectedUser.userInfo.userid,
            role: this.userService.ConnectedUser.userInfo.role,
            update: update
        }

        let URL = DevConfig.protocol+"://"+ DevConfig.ip + ":" + DevConfig.port + DevConfig.setting_update; 
        this.http.post(URL, body, options)
        .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
        .toPromise()
        .then( (res:Response) => {
            if(res.status == 200) {        
                this.alertService.successMessage('단축버튼', '단축버튼 항목이 정상적으로 삭제 되었습니다.');
                this.userService.ConnectedUser.settingInfo.shortCutGlobal = JSON.stringify(arr);
                this.onSearchGlobal();
            }
        },
        (error) => { this.alertService.handleError(error); })
        .catch( (error) => { this.alertService.handleError(error); } );
    }  

    
    
  }

  onClickModalShow() {
    // 0. 상담중이면 메세지 출력후 동작 못하게 한다.
    this.shortBtnTitle = '단축버튼 생성';

    if(this.chatService.checkActiveRooms() > 0) {
      this.alertService.handleError('상담중에는 단축버튼 생성을 할 수 없습니다.'); 
      return;
    }

    if(this.shortCutFlag === true){    //개인용 단축버튼 삭제
        if(this.userService.ConnectedUser.userInfo.role !== "manager"){
            this.alertService.handleError('전체 단축버튼은 매니저만 생성 가능합니다.'); 
            return;
        }
    }

    $(".scmodal").modal("show");
  }

  //단축버튼 신규저장 및 수정
  onCreate() {
    if ( this.shortcutname.trim() === '' || this.shortcutmessage.trim() === '' ) {
      this.alertService.alramBox('알림', '공백 문자는 입력할 수 없습니다.', '#C46A69', 'fa fa-warning shake animated');
      return false;
    }
    let name = this.shortcutname;
    let message = this.shortcutmessage;
    let flag = false;
    
    let headers = new Headers({ 'Content-type' : 'application/json' });
    let options = new RequestOptions({ headers });

    let arr = [];
    let obj = {};    
    obj[""+name+""] = message;  //신규 단축버튼 셋팅

    if(this.shortCutFlag === false){    //개인용 단축버튼 삭제
        // NULL 체크 추가
        if( this.model.shortcut == null || this.model.shortcut.length == 0 ){
            arr.push(obj);
        } else {
            if(this.shortBtnTitle == '단축버튼 생성'){   
                $.each(JSON.parse(this.model.shortcut), function(k, val){
                    let keyval = Object.keys(val).map(key => key );
                    if(keyval.toString() == name) {
                    flag = true;
                    return;
                    }
                });

                for ( let item of JSON.parse(this.model.shortcut) ) {
                    arr.push(item);
                }
                arr.push(obj);
            }else{

                let indexs = Array<number>();
                let getChangeBeforeTitle = this.changeBeforeTitle;

                $.each(JSON.parse(this.model.shortcut), function(k, val){
                    let keyval = Object.keys(val).map(key => key );
                    if(keyval.toString() == getChangeBeforeTitle) {
                        indexs.push(k);
                    }
                });
                
                arr = JSON.parse(this.model.shortcut);
                for(var i=indexs.length; 0<i; i--){
                    arr.splice(indexs[i-1], 1);       //기존 단축버튼 삭제
                    arr.splice(indexs[i-1], 0,obj);   //신규 단축버튼 그자리에 추가
                }
                
            }
        }

        let update = {
            "userid": this.model.userid,     
            "shortcut": arr
        };

        let data = {
            "accessToken": this.token,
            "company": this.model.company,
            "userid": this.model.userid,
            "update": update
        };
        
        let URL = DevConfig.protocol+"://"+ DevConfig.ip + ":" + DevConfig.port + DevConfig.user_update; 
        this.http.post(URL, JSON.stringify(data), options)
                .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
                .toPromise()
                .then( (res:Response) => {
                    if(res.status == 200) {
                        this.alertService.successMessage('단축버튼', '단축버튼 항목이 정상적으로 저장 되었습니다.');
                        this.model.shortcut = JSON.stringify(arr);
                        this.onSearch();
                        this.shortcutname = "";
                        this.shortcutmessage = "";
                        this.model.shortcut = JSON.stringify(arr);
                        $(".scmodal").modal("hide");
                    }
                },
                (error) => { this.alertService.handleError(error); })
                .catch( (error) => { this.alertService.handleError(error); } );

    }else{  //단체용 단축버튼 추가

        if(this.userService.ConnectedUser.userInfo.role !== "manager"){
            this.alertService.handleError('전체 단축버튼 생성 및 수정은 매니저만 가능합니다.'); 
            return;
        }

        // NULL 체크 추가
        if( this.userService.ConnectedUser.settingInfo.shortCutGlobal == null || this.userService.ConnectedUser.settingInfo.shortCutGlobal.length == 0 ){
            arr.push(obj);
        } else {
            if(this.shortBtnTitle == '단축버튼 생성'){   
                $.each(JSON.parse(this.userService.ConnectedUser.settingInfo.shortCutGlobal), function(k, val){
                    let keyval = Object.keys(val).map(key => key );
                    if(keyval.toString() == name) {
                    flag = true;
                    return;
                    }
                });

                for ( let item of JSON.parse(this.userService.ConnectedUser.settingInfo.shortCutGlobal) ) {
                    arr.push(item);
                }
                arr.push(obj);
            }else{

                let indexs = Array<number>();
                let getChangeBeforeTitle = this.changeBeforeTitle;

                $.each(JSON.parse(this.userService.ConnectedUser.settingInfo.shortCutGlobal), function(k, val){
                    let keyval = Object.keys(val).map(key => key );
                    if(keyval.toString() == getChangeBeforeTitle) {
                        indexs.push(k);
                    }
                });
                
                arr = JSON.parse(this.userService.ConnectedUser.settingInfo.shortCutGlobal);
                for(var i=indexs.length; 0<i; i--){
                    arr.splice(indexs[i-1], 1);       //기존 단축버튼 삭제
                    arr.splice(indexs[i-1], 0,obj);   //신규 단축버튼 그자리에 추가
                }
                
            }
        }

        let headers = new Headers({ 'Content-type' : 'application/json' });
        let options = new RequestOptions({ headers });

        let update = {
            "shortCutGlobal": arr
        }

        let body = {
            accessToken: this.userService.ConnectedUser.accessToken,
            company: this.userService.ConnectedUser.userInfo.company,
            userid: this.userService.ConnectedUser.userInfo.userid,
            role: this.userService.ConnectedUser.userInfo.role,
            update: update
        }

        let URL = DevConfig.protocol+"://"+ DevConfig.ip + ":" + DevConfig.port + DevConfig.setting_update; 
        this.http.post(URL, JSON.stringify(body), options)
                .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
                .toPromise()
                .then( (res:Response) => {
                    if(res.status == 200) {        
                        this.alertService.successMessage('마이페이지', '항목이 정상적으로 저장 되었습니다.');
                        this.onSearchGlobal();
                        this.shortcutname = "";
                        this.shortcutmessage = "";
                        this.userService.ConnectedUser.settingInfo.shortCutGlobal = JSON.stringify(arr);
                        $(".scmodal").modal("hide");
                    }
                },
                (error) => { this.alertService.handleError(error); })
                .catch( (error) => { this.alertService.handleError(error); } );

    }
  }

  //단축버튼 저장 및 수정 팝업 닫음 
  onCloseModal() {
    this.shortcutname = "";
    this.shortcutmessage = "";    
    $(".scmodal").modal("hide");
  }

  //단축버튼 순서변경 팝업 닫음
  onCloseChangeShortCutModal() {
    $(".chscmodal").modal("hide");
  }

  //단축버튼 유효성 체크
  onKeyUpShortcutItem(event) {
    if(this.shortBtnTitle == '단축버튼 생성'){  
        this.checkShortcutInputValidationALL();
    }else{
        this.isShortcutButton = true;
    }
  }

  //파라미터 선택(복사)
  copyParameter(value){
      //this.shortcutmessage = this.shortcutmessage+"[["+value+"]]";
      this.clipboardService.copy("[["+value+"]]"); 
      this.alertService.successMessage('복사완료', '파라미터가 복사되었습니다<br>Ctrl+V로 원하는곳에 붙여넣기 사용하세요.');
  }

  //단축버튼 팝업 오픈
  openChangeSort(){

    if(this.shortCutFlag === true){    //전체용 단축버튼 삭제
        if(this.userService.ConnectedUser.userInfo.role !== "manager"){
            this.alertService.handleError('전체 단축버튼 순서변경은 매니저만 수정 가능합니다.'); 
            return;
        }
    }

    this.shortcuts = [];
    this.shotcutPreviews = [];    
    let items = [];    

    if(this.shortCutFlag === false){    //개인용 단축버튼 리스트
        $.each(JSON.parse(this.model.shortcut), function(k, val){
            let keyval = Object.keys(val).map(key => key );
            let value = Object.keys(val).map(key => val[key] );
    
            items.push({code:keyval, name:value}); 
        });
    }else{      //전체용 단축버튼 리스트
        $.each(JSON.parse(this.userService.ConnectedUser.settingInfo.shortCutGlobal), function(k, val){
            let keyval = Object.keys(val).map(key => key );
            let value = Object.keys(val).map(key => val[key] );
    
            items.push({code:keyval, name:value}); 
        });
    } 
    

    this.shortcuts = items;

    $( "#sortable" ).sortable();            //jQuery UI를 사용한 Drag&Drop 활성화
    $( "#sortable" ).disableSelection();
    
    this.onChangeShortCutSort();  

    $(".chscmodal").modal("show");

  }

  //단축버튼 미리보기 셋팅
  onChangeShortCutSort(){
    setTimeout(() => {
        let previreItems = [];
        $("#sortable li").each(function(){
            previreItems.push({code:$(this).text()}); 
        });
        this.shotcutPreviews = previreItems;
    }, 300);  
  }

  //단축버튼 순서변경 저장
  onCommitShortCutSort(){

    let headers = new Headers({ 'Content-type' : 'application/json' });
    let options = new RequestOptions({ headers });
  
    let arr = [];
    let obj = {};    
    
    $("#sortable li").each(function(){
        obj = {}; 
        obj[$(this).text()] = $(this).attr('title');
        arr.push(obj);
    });

    if(this.shortCutFlag === false){    //개인용 단축버튼 리스트

        let update = {
            "userid": this.model.userid,     
            "shortcut": arr
        };
    
        let data = {
            "accessToken": this.token,
            "company": this.model.company,
            "userid": this.model.userid,
            "update": update
        };
        
        let URL = DevConfig.protocol+"://"+ DevConfig.ip + ":" + DevConfig.port + DevConfig.user_update; 
        this.http.post(URL, JSON.stringify(data), options)
                .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
                .toPromise()
                .then( (res:Response) => {
                    if(res.status == 200) {
                        this.alertService.successMessage('단축버튼', '단축버튼 순서가 변경 되었습니다.');
                        this.model.shortcut = JSON.stringify(arr);
                        this.onSearch();
                        this.shortcutname = "";
                        this.shortcutmessage = "";
                        $(".chscmodal").modal("hide");
                    }
                },
                (error) => { this.alertService.handleError(error); })
                .catch( (error) => { this.alertService.handleError(error); } );

    }else{      //전체용 단축버튼 리스트

        let headers = new Headers({ 'Content-type' : 'application/json' });
        let options = new RequestOptions({ headers });

        let update = {
            "shortCutGlobal": arr
        }

        let body = {
            accessToken: this.userService.ConnectedUser.accessToken,
            company: this.userService.ConnectedUser.userInfo.company,
            userid: this.userService.ConnectedUser.userInfo.userid,
            role: this.userService.ConnectedUser.userInfo.role,
            update: update
        }

        let URL = DevConfig.protocol+"://"+ DevConfig.ip + ":" + DevConfig.port + DevConfig.setting_update; 
        this.http.post(URL, JSON.stringify(body), options)
                .timeout(15000, new Error('요청 시간이 초과되었습니다.'))
                .toPromise()
                .then( (res:Response) => {
                    if(res.status == 200) {        
                        this.alertService.successMessage('단축버튼', '단축버튼 순서가 변경 되었습니다.');
                        this.userService.ConnectedUser.settingInfo.shortCutGlobal = JSON.stringify(arr);
                        this.onSearchGlobal();
                        this.shortcutname = "";
                        this.shortcutmessage = "";
                        $(".chscmodal").modal("hide");
                    }
                },
                (error) => { this.alertService.handleError(error); })
                .catch( (error) => { this.alertService.handleError(error); } );

    }     

  }

  //순서변경  컨텐츠 클릭시 미리보기 초기화
  resetPreview(){
    this.shotcutPreviews = [];   
  }


  public checkShortcutInputValidationALL() {
    this.isShortcutOverlap = this.checkOvelapShortcut();  // 단축버튼명 중복체크

    if (!this.isShortcutOverlap && this.isValidStringLength(this.shortcutname) && this.isValidStringLength(this.shortcutmessage) )
      this.isShortcutButton = true;
    else  
      this.isShortcutButton = false;
  }

  private checkOvelapShortcut(): boolean {   
    // NULL 체크 추가
    if( this.model.shortcut == null || this.model.shortcut.length == 0 ) return false;
    else {
      let shortcut = JSON.parse(this.model.shortcut);
      for ( var index in shortcut ) {
        var obj = shortcut[index]
        let key = Object.keys(obj);
        if(key.toString() == this.shortcutname) return true;
      }
      return false;
    }
  }

  private isValidStringLength(value: string): boolean {
    if( value != undefined ) {
      return value.length > 0 ? true : false;      
    }
  }  


  private onChangeShortCutFlag(){      
      if(this.shortCutFlag === false){
        this.onSearch();
      }else{
        this.onSearchGlobal();
      }      
  }

  //단축버튼(shorcut)조회 (공용) - manager계정만 사용 가능
  onSearchGlobal() {

    var datatable =  $("#tableMypageList").dataTable().api();
    datatable.clear();

    this.userService.getSettingInfo(this.userService.ConnectedUser.accessToken)
                    .subscribe ( 
                        (response: Response) => {
                            $("input:checkbox[name='select_all']").prop("checked", false);

                            console.log('this.userService.ConnectedUser.settingInfo.shortCutGlobal=',this.userService.ConnectedUser.settingInfo.shortCutGlobal);

                            if( this.userService.ConnectedUser.settingInfo.shortCutGlobal == null || this.userService.ConnectedUser.settingInfo.shortCutGlobal.length == 0 ){
                                datatable.draw();
                                return false;
                            }

                            let jasonArrayData = [];
                            $.each(JSON.parse(this.userService.ConnectedUser.settingInfo.shortCutGlobal), function(k, val){      
                                let jsonData = {
                                id:Object.keys(val).map(key => key ),
                                num:k+1,
                                key:Object.keys(val).map(key => key ),
                                val:Object.keys(val).map(key => val[key])
                                }
                                jasonArrayData.push(jsonData);
                            });

                            console.log('jasonArrayData=',jasonArrayData);

                            datatable.rows.add(jasonArrayData);
                            datatable.draw();

                            $('#tableMypageList').delegate('tr', 'click', (event) => {
                                //this.isError = false;
                                //this.errorMessage = '';
                                this.shortBtnTitle = '단축버튼 수정'; 
                                
                                // 데이터 갯수를 카운트 하여 선택한 row에 데이터가 없으면 이벤트가 동작하지 않게 한다.      
                                let $row = $(event.target).closest('tr');  
                                let data =  $("#tableMypageList").dataTable().api().row($row).data();
                                            
                                if (data != undefined) {
                                    this.changeBeforeTitle = data.key;            
                                    this.shortcutname = ""+data.key+"";
                                    this.shortcutmessage = ""+data.val+"";
                                    $(".scmodal").modal("show");
                                } 
                            });

                        },(error) => {
                        }); 

  }
  
}
