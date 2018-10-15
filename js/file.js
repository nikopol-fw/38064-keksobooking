'use strict';

(function () {
  var IMAGE_TYPES = ['image/jpeg', 'image/gif', 'image/png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var avatarUploadNode = window.form.form.querySelector('#avatar');
  var avatarPreviewNode = window.form.form.querySelector('.ad-form-header__preview img');

  var photosPoolNode = window.form.form.querySelector('.ad-form__photo-container');
  var photosUploadNode = window.form.form.querySelector('#images');
  var photoPreviewNode = window.form.form.querySelector('.ad-form__photo');
  var photoPreviewTemplate = photoPreviewNode.cloneNode(true);


  var uploadImg = function (fileNode, previewNode) {
    var file = fileNode.files[0];

    if (file) {
      var matches = IMAGE_TYPES.some(function (item) {
        return item === file.type;
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewNode.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  avatarUploadNode.addEventListener('change', function () {
    uploadImg(avatarUploadNode, avatarPreviewNode);
  });


  var removePhotos = function () {
    var photosNode = window.form.form.querySelectorAll('.ad-form__photo');
    photosNode.forEach(function (item) {
      item.remove();
    });
  };

  var resetPhotos = function () {
    removePhotos();
    var defaultPhoto = photoPreviewTemplate.cloneNode(true);
    photosPoolNode.appendChild(defaultPhoto);
  };

  photosUploadNode.addEventListener('change', function () {
    var file = photosUploadNode.files;

    if (file) {
      removePhotos();

      for (var i = 0; i < file.length; i++) {
        var matches = IMAGE_TYPES.some(function (item) {
          return item === file[i].type;
        });

        if (!matches) {
          continue;
        }

        var reader = new FileReader();

        var loadPhoto = function (img) {
          var newPhotoNode = photoPreviewTemplate.cloneNode(true);
          newPhotoNode.style.backgroundImage = 'url(' + img + ')';
          newPhotoNode.style.backgroundSize = 'contain';
          newPhotoNode.style.backgroundPosition = 'center';
          newPhotoNode.style.backgroundRepeat = 'no-repeat';
          photosPoolNode.appendChild(newPhotoNode);
        };

        reader.addEventListener('load', function (evt) {
          loadPhoto(evt.srcElement.result);
        });

        reader.readAsDataURL(file[i]);
      }
    }
  });


  window.file = {
    DEFAULT_AVATAR: DEFAULT_AVATAR,
    avatarPreviewNode: avatarPreviewNode,
    resetPhotos: resetPhotos
  };
})();
