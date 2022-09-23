import { SignUpForm } from '../components/SignUpForm';
import style from '../styles/connect.module.css';

export default function SignUp() {
  return (
    <div className={style.connectPage}>
      <div className={style.instructions}>
        <SignUpForm />
      </div>
    </div>
  );
}
