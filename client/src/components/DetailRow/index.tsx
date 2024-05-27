import { Icon } from '@antmjs/vantui';

interface DetailRowProps {
  leftText: string;
  children: React.ReactNode;
}

function DetailRow(props: DetailRowProps) {
  const { leftText, children } = props;
  return (
    <div
      style={{
        display: 'flex',
        padding: '10px 20px 10px 20px',
        gap: '20px',
      }}
    >
      <div>{leftText}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

interface IconRowProps {
  name: string;
  children: React.ReactNode;
}

function IconRow(props: IconRowProps) {
  const { name, children } = props;
  return (
    <div
      style={{
        display: 'flex',
        padding: '10px 20px 10px 20px',
        gap: '20px',
      }}
    >
      <Icon name={name} size="large" />
      <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}
export { DetailRow, IconRow };
