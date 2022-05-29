import React from "react";

export default function ListTamu(props) {
  const clicDelete = () => {
    props.delete(props.data.id);
  };

  const clicUpdate = () => {
    props.update(props.data);
  };

  return (
    <div className="m-3 border-2 rounded-lg p-2">
      <p className="text-[16px] text-black font-medium">
        name : {props.data.name}
      </p>
      <p className="text-[16px] text-black font-medium">
        email : {props.data.email}
      </p>
      <div className="flex flex-row mt-3">
        <button className="bg-orange-400 text-white px-3 py-2 rounded-lg mr-2" onClick={clicUpdate}>
          Edit
        </button>
        <button
          className="bg-red-400 text-white px-3 py-2 rounded-lg"
          onClick={clicDelete}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
