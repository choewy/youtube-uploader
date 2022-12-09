export class OpenYoutubeStudioError extends Error {
  constructor(e?: any) {
    super();
    this.name = OpenYoutubeStudioError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class InsertEmailError extends Error {
  constructor(e?: any) {
    super();
    this.name = InsertEmailError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class InsertPasswordError extends Error {
  constructor(e?: any) {
    super();
    this.name = InsertPasswordError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class OpenTopAccountMenuError extends Error {
  constructor(e?: any) {
    super();
    this.name = OpenTopAccountMenuError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class OpenChannelSelectMenuError extends Error {
  constructor(e?: any) {
    super();
    this.name = OpenChannelSelectMenuError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class NotFoundChannelNameError extends Error {
  constructor(e?: any) {
    super();
    this.name = NotFoundChannelNameError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class ClickSelectedChannelError extends Error {
  constructor(e?: any) {
    super();
    this.name = ClickSelectedChannelError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class ClickUploadButtonError extends Error {
  constructor(e?: any) {
    super();
    this.name = ClickUploadButtonError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class UploadFileError extends Error {
  constructor(e?: any) {
    super();
    this.name = UploadFileError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}

export class WriteVideoDescriptionError extends Error {
  constructor(e?: any) {
    super();
    this.name = WriteVideoDescriptionError.name;

    if (e) {
      this.message = e.message;
      this.stack = e.stack;
    }
  }
}
