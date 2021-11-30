import React, { useState, useEffect } from "react";
import styles from "./ListItemPopUp.module.scss";

export default function ListItemPopUp(props) {
  const [listItemBannerModified, setListItemBannerModified] = useState("");
  const [listItemTitleModified, setListItemTitleModified] = useState("");
  const [listItemDescriptionModified, setListItemDescriptionModified] =
    useState("");
  useEffect(() => {
    setListItemTitleModified(props.listItemTitle);
  }, [props.listItemTitle]);
  const [urlImage, setUrlImage] = useState("");

  const saveListItem = () => {
    if (
      listItemTitleModified !== props.listItemTitle &&
      listItemBannerModified !== props.listItemBanner
    ) {
      props.setListItemBanner(listItemBannerModified);
      props.setListItemTitle(listItemTitleModified);
    } else {
      props.setListItemBanner(props.listItemBanner);
      props.setListItemTitle(props.listItemTitle);
    }
  };
  const unsavePopup = () => {
    props.setOpenPopUp(false);
    if (props.listItemDescription !== listItemDescriptionModified) {
      props.setListItemDescription(props.listItemDescription);
    }
  };
  return (
    <>
      <div
        className={styles.behind_popup}
        onClick={() => {
          unsavePopup();
        }}
      ></div>
      <div className={styles.list_item_popup}>
        <button
          className={styles.cross}
          onClick={() => {
            unsavePopup();
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.36401 6.36398L19.0919 19.0919"
              stroke="#838383"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.36401 19.0919L19.0919 6.36397"
              stroke="#838383"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.bottom_content}>
          <input
            onChange={(e) => {
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                setUrlImage(reader.result);
              });
              reader.readAsDataURL(e.target.files[0]);
            }}
            className={styles.button_primary}
            type="file"
            size="50"
            title="Image"
          />
        </div>
        <div>
          <img src={urlImage} />
        </div>

        <h3>Task title :</h3>
        <textarea
          className={styles.list_item_title}
          onChange={(e) => {
            setListItemTitleModified(e.target.value);
          }}
          defaultValue={props.listItemTitle}
        ></textarea>
        <div className={styles.bottom_content}>
          <h3>Description :</h3>
          <textarea
            className={styles.list_item_description}
            onChange={(e) => setListItemDescriptionModified(e.target.value)}
            defaultValue={props.listItemDescription}
          ></textarea>
          <button
            className={styles.button_primary}
            onClick={() => {
              saveListItem();
              props.setListItemDescription(listItemDescriptionModified);
              props.setOpenPopUp(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
