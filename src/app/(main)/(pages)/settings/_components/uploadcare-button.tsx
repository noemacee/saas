"use client";
import React, { useEffect, useRef, useState } from "react";
import * as LR from "@uploadcare/blocks";
import { useRouter } from "next/navigation";
import "@uploadcare/blocks/web/lr-file-uploader-regular.min.css";

type Props = {
  onUpload: (e: String) => any;
};

LR.registerBlocks(LR);

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const { file } = await onUpload(e.detail.cdnUrl);
      router.refresh();
    };

    if (ctxProviderRef.current === null) return;

    ctxProviderRef.current.addEventListener(
      "file-upload-success",
      handleUpload
    );
  }, []);

  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="7f9d60c3640c97912462" />

      <lr-file-uploader-regular ctx-name="my-uploader" />

      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
};

export default UploadCareButton;
