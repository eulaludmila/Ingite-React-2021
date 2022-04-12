import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

//ReactElement - precisa ser um elemento do react
interface ActiveLinkProps extends LinkProps{
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

//shouldMatchExactHref - parametro para caso a url tenha que ser exatamente igual
export function ActiveLink({ children, shouldMatchExactHref = false, ...rest}: ActiveLinkProps) {
  let isActive = false;
  const {asPath} = useRouter();
  console.log("shouldMatchExactHref: ", shouldMatchExactHref)

  if(shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if(!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
    isActive = true;
  }
  
  return(
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}