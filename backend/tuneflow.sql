\echo "Delete and create tuneflow db?"
\prompt "Return for yes or control-C to cancel >" foo

DROP DATABASE IF EXISTS tuneflow;
CREATE DATABASE tuneflow;

\connect tuneflow;

\i tuneflow-schema.sql
\i tuneflow-seed.sql

\echo "Delete abd recreate tuneflow_test db?"
\prompt "Return for yes or control-C for cancel >" foo

DROP DATABASE IF EXISTS tuneflow_test;
CREATE DATABASE tuneflow_test;

\connect tuneflow_test;

\i tuneflow-schema.sql