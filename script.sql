create table if not exists USER_INFO_TB
(
    ID         varchar(30)                          not null,
    USER_NAME  varchar(10)                          not null,
    PASSWORD   varchar(255)                         not null,
    CREATE_DTM datetime default current_timestamp() not null,
    constraint USER_INFO_TB_ID_uindex
        unique (ID)
);

alter table USER_INFO_TB
    add primary key (ID);

create table if not exists AUDIO_LIST_TB
(
    SEQ        int auto_increment,
    USER_ID    varchar(30)                          not null,
    TRACK_NAME varchar(100)                         not null,
    TITLE      varchar(100)                         not null,
    ALBUM      varchar(100)                         null,
    FILE_PATH  varchar(300)                         not null,
    ARTIST     varchar(50)                          null,
    CREATE_DTM datetime default current_timestamp() not null,
    constraint AUDIO_LIST_TB_SEQ_uindex
        unique (SEQ),
    constraint AUDIO_LIST_TB_USER_INFO_TB_ID_fk
        foreign key (USER_ID) references USER_INFO_TB (ID)
);

alter table AUDIO_LIST_TB
    add primary key (SEQ);


