type NoticeProps = {
  message: string;
};

export const Notice = ({ message }: NoticeProps) => {
  return (
    <>
      <h3>WebPush PWA</h3>
      <p>{message}</p>
    </>
  );
};
