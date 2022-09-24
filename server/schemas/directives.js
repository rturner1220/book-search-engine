import { gql, SchemaDirectiveVisitor, ApolloError } from "apollo-server";
import { defaultFieldResolver } from "graphql";

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = function (...args) {
            const [, , context] = args;

            if (!context?.user) {
                throw new ApolloError("User is not authenticated", "UNAUTHENTICATED");
            }
            return resolve.apply(this, args);
        };
    }
}

export default { isAuthenticated: IsAuthenticatedDirective };